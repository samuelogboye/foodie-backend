#!/usr/bin/env python3
"""Template for the Review Class"""
from foodie import db
from foodie.models.base import BaseModel
from foodie.models.user import User
from foodie.models.menu_item import MenuItem


class Review(BaseModel):
        """Template for the Review Class"""
        __tablename__ = 'reviews'
        user_id = db.Column(db.String(255), db.ForeignKey('users.id'), nullable=False)
        menu_item_id = db.Column(db.String(255), db.ForeignKey('menu_items.id'), nullable=False)
        rating = db.Column(db.Integer, nullable=False)
        comment = db.Column(db.String(1000), nullable=True)

        user = db.relationship('User', back_populates='reviews')
        menu_item = db.relationship('MenuItem', backref=db.backref('reviews', lazy=True))


        def __init__(self, user_id, menu_item_id, rating, comment=None):
                super().__init__()
                self.user_id = user_id
                self.menu_item_id = menu_item_id
                self.rating = rating
                self.comment = comment

        def __repr__(self):
                return f'<Review {self.id}>'
        def format(self):
                return {
                                'id': self.id,
                                'user_id': self.user_id,
                                'menu_item_id': self.menu_item_id,
                                'rating': self.rating,
                                'comment': self.comment
                }