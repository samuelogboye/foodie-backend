from flask import Blueprint, request, jsonify
from foodie import db
from foodie.db_utils import IdSchema
from foodie.util_routes import get_image_url
from foodie.models.menu_category import MenuCategory
from foodie.models.menu_item import MenuItem
from uuid import UUID

menu_item_bp = Blueprint('menu_item', __name__, url_prefix='/api/v1/menu_item')


# Route to get all menu items
@menu_item_bp.route('/', methods=['GET'])
def get_menu_items():
        """
        Retrieves all menu items.

        Returns:
                A JSON response containing the menu items.
                The response has the following structure:
                {
                        'menu_items': [
                                {
                                        'menu_item_id': int,
                                        'name': str,
                                        'description': str,
                                        'price': float
                                },
                                ...
                        ],
                        'message': str
                }
        """
        menu_items = MenuItem.query.all()
        menu_items = [item.format() for item in menu_items]
        return jsonify({
                'menu_items': menu_items,
                'message': 'Menu items retrieved successfully'
        }), 200


# Route to get menu items by category
@menu_item_bp.route('/category/<category_id>', methods=['GET'])
def get_menu_items_by_category(category_id : UUID):
        """
        Retrieves menu items by category ID.

        Parameters:
                category_id (UUID): The ID of the category to retrieve menu items for.

        Returns:
                A JSON response containing the menu items.
                The response has the following structure:
                {
                        'menu_items': [
                                {
                                        'menu_item_id': int,
                                        'name': str,
                                        'description': str,
                                        'price': float
                                },
                                ...
                        ],
                        'message': str
                }
        """
        category_id = IdSchema(id=category_id).id
        menu_items = MenuItem.query.filter_by(menu_category_id=category_id).all()
        # get the menu category name from the menu item category id
        category = MenuCategory.query.filter_by(id=category_id).first()
        category_name = category.name
        if not menu_items:
                return jsonify({
                        'menu_items': [],
                        'message': f'Menu items not found for {category_name} Category'
                }), 404

        menu_items = [item.format() for item in menu_items]
        return jsonify({
                'menu_items': menu_items,
                'message': f'Menu items for {category_name} retrieved successfully',
                'menu_items_count': len(menu_items)
        }), 200


# Route to create a menu item under a category
@menu_item_bp.route('/<category_id>/add-item', methods=['POST'])
def create_menu_item(category_id : UUID):
        name = request.form.get('name')
        description = request.form.get('description')
        price = request.form.get('price')
        image = request.files['image']

        if not name or not description or not price or not image:
                return jsonify({
                        'message': 'Invalid request'
                }), 400

        image_url = get_image_url(image)

        new_item = MenuItem(name=name, description=description, price=price, menu_category_id=category_id, image_url=image_url)
        new_item.insert()

        return jsonify({
                'menu_item': new_item.format(),
                'message': 'Menu item created successfully'
        }), 201

# Route to get information about a menu item
@menu_item_bp.route('/<menu_item_id>', methods=['GET'])
def get_menu_item(menu_item_id : UUID):
        menu_item_id = IdSchema(id=menu_item_id).id
        menu_item = MenuItem.query.filter_by(id=menu_item_id).first()
        if not menu_item:
                return jsonify({
                        'message': 'Menu item not found'
                }), 404
        return jsonify({
                'menu_item': menu_item.format(),
                'message': 'Menu item retrieved successfully'
        }), 200
