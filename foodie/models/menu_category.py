#!/usr/bin/env python3
"""Template for the MenuCategory Class"""
from foodie import db
from foodie.models.base import BaseModel


class MenuCategory(BaseModel):
        """Template for the MenuCategory Class"""
        __tablename__ = 'menu_categories'
        name = db.Column(db.String(255), nullable=False)
        description = db.Column(db.String(500), nullable=False)

        # Adding a one-to-many relationship with MenuItem
        menu_items = db.relationship('MenuItem', backref='category_items', lazy=True)



        def __init__(self, name, description):
                super().__init__()
                self.name = name
                self.description = description

        def __repr__(self):
                return f'<MenuCategory {self.id}>'

        def format(self):
                return {
                        'id': self.id,
                        'name': self.name,
                        'description': self.description
                }