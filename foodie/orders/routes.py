from flask import Blueprint, request, jsonify
from foodie import db
from foodie.db_utils import IdSchema
from foodie.models.order import Order
from foodie.models.menu_item import MenuItem
from foodie.models.order_item import OrderItem
from uuid import UUID
from foodie.auth.auth_utils import login_required, admin_required,  encrypt_order_id, decrypt_order_id


order_bp = Blueprint('order', __name__, url_prefix='/api/v1/order')


# Get all orders
@order_bp.route('/', methods=['GET'])
def get_orders():
        orders = Order.query.all()
        if not orders:
                return jsonify({
                        'message': 'No orders found'
                }), 404
        return jsonify([order.format() for order in orders])


# Get an order
@order_bp.route('/<order_id>', methods=['GET'])
def get_order(order_id):
        order_id = IdSchema(id=order_id).id
        order = Order.query.filter_by(id=order_id).first()
        if not order:
                return jsonify({
                        'message': 'Order not found'
                }), 404
        return jsonify({
                'order': order.format(),
                'message': 'Order retrieved successfully'
        }), 200

import stripe
import os
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Create an order
@order_bp.route('/', methods=['POST'])
@login_required
def create_order(user):
        try:
                data = request.get_json()
                user_id = user.id
                total_price = data.get('totalOrderPrice')
                delivery_address = data.get('shippingAddress')
                status='processing'

                if not user_id or not total_price or not data['cartItems'] or not delivery_address or not status:
                        return jsonify({
                                'message': 'Invalid request'
                        }), 400

                new_order = Order(user_id=user_id, total_price=total_price, delivery_address=delivery_address, status=status)
                new_order.insert()

                line_items = []
                for item in data['cartItems']:
                        order_item = OrderItem(order_id=new_order.id, menu_item_id=item['id'], quantity=item['quantity'], price=item['total'])
                        db.session.add(order_item)

                        menu_item = MenuItem.query.filter_by(id=item['id']).first()
                        if not menu_item:
                                return jsonify({
                                        'message': 'Menu item not found'
                                }), 404

                        line_items.append({
                                'price_data': {
                                        'currency': 'ngn',
                                        'product_data': {
                                                'name': menu_item.name,
                                                'images': [menu_item.image_url]
                                        },
                                        'unit_amount': int(menu_item.price * 100)
                                },
                                'quantity': item['quantity']
                        })

                db.session.commit()
                print(line_items)
                # Get the domain dynamically
                YOUR_DOMAIN = request.url_root[:-1]
                # Encrypt order_id to embed in the success_url
                encrypted_order_id = encrypt_order_id(new_order.id)
                success_url = f"{request.url_root[:-1]}/success/{encrypted_order_id}?appreciate=thanksfortheorder"
                checkout_session = stripe.checkout.Session.create(
                    line_items=line_items,
                    mode="payment",
                    success_url='https://foodie-bh1b.onrender.com/',
                    cancel_url=YOUR_DOMAIN + "/cancel",
                )

                return (
                    jsonify(
                        {
                            "checkout_session_id": checkout_session.id,
                            "checkout_session_url": checkout_session.url,
                        }
                    ),
                    200,
                )
        except Exception as e:
                db.session.rollback()
                print(f"Error creating order: {e}")
                return str(e), 500



