#!/usr/bin/env python3
"""Template for the OrderItem Class"""
from foodie import db
from foodie.models.base import BaseModel
from foodie.models.order import Order
from foodie.models.menu_item import MenuItem

class OrderItem(BaseModel):
        """Template for the OrderItem Class"""
        __tablename__ = 'order_items'
        order_id = db.Column(db.String(255), db.ForeignKey('orders.id', ondelete='CASCADE'), nullable=False)
        menu_item_id = db.Column(db.String(255), db.ForeignKey('menu_items.id'), nullable=False)
        quantity = db.Column(db.Integer, nullable=False)
        price = db.Column(db.Numeric(10, 2), nullable=False)

        def __init__(self, order_id, menu_item_id, quantity, price):
                super().__init__()
                self.order_id = order_id
                self.menu_item_id = menu_item_id
                self.quantity = quantity
                self.price = price

        def __repr__(self):
                return f'<OrderItem {self.id}>'

        def format(self):
                return {
                        'id': self.id,
                        'order_id': self.order_id,
                        'menu_item_id': self.menu_item_id,
                        'quantity': self.quantity,
                        'price': self.price
                }