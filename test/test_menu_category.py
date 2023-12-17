import unittest
from unittest.mock import patch
from flask import jsonify, request
from foodie import create_app, db
from foodie.config import TestingConfig
from foodie.models import MenuCategory, MenuItem
import json

class MenuCategoryTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app(TestingConfig)
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_get_menu_categories_with_existing_categories(self):
        # Create some menu categories
        category1 = MenuCategory(name='Category 1', description='Description 1')
        category2 = MenuCategory(name='Category 2', description='Description 2')
        db.session.add(category1)
        db.session.add(category2)
        db.session.commit()

        # Send request to get menu categories
        response = self.client.get('/api/v1/menu_category/')

        # Check response status code
        self.assertEqual(response.status_code, 200)

        # Check response data
        data = response.get_json()
        self.assertIn('menu_categories', data)
        self.assertIn('message', data)
        self.assertIn('total_menu_categories', data)
        self.assertIn('total_menu_items', data)

        # Check menu categories data
        menu_categories_data = data['menu_categories']
        self.assertEqual(len(menu_categories_data), 2)

        # Check menu category 1 data
        category1_data = menu_categories_data[0]
        self.assertEqual(category1_data['menu_category_id'], category1.id)
        self.assertEqual(category1_data['name'], category1.name)
        self.assertEqual(category1_data['description'], category1.description)
        self.assertEqual(category1_data['menu_items'], [])

        # Check menu category 2 data
        category2_data = menu_categories_data[1]
        self.assertEqual(category2_data['menu_category_id'], category2.id)
        self.assertEqual(category2_data['name'], category2.name)
        self.assertEqual(category2_data['description'], category2.description)
        self.assertEqual(category2_data['menu_items'], [])

        # Check total menu categories and total menu items
        self.assertEqual(data['total_menu_categories'], 2)
        self.assertEqual(data['total_menu_items'], 0)

    def test_get_menu_categories_with_no_categories(self):
        # Send request to get menu categories
        response = self.client.get('/api/v1/menu_category/')

        # Check response status code
        self.assertEqual(response.status_code, 404)

        # Check response data
        data = response.get_json()
        self.assertIn('message', data)
        self.assertIn('menu_categories', data)

        # Check menu categories data
        menu_categories_data = data['menu_categories']
        self.assertEqual(len(menu_categories_data), 0)

        # Check if the expected keys are present in the response
        self.assertNotIn('total_menu_categories', data)
        self.assertNotIn('total_menu_items', data)

class MenuCategoryTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestingConfig)
        self.client = self.app.test_client
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.category_data = {
            'name': 'Test Category',
            'description': 'Test Description'
        }

        # with self.app.app_context():
        #     db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_create_menu_category_success(self):
        response = self.client().post('/api/v1/menu_category/', json=self.category_data)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 201)
        self.assertTrue('id' in data)
        self.assertTrue('name' in data)
        self.assertTrue('description' in data)

    def test_create_menu_category_missing_name(self):
        category_data = {
            'description': 'Test Description'
        }
        response = self.client().post('/api/v1/menu_category/', json=category_data)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['message'], 'Name is required')

    def test_create_menu_category_missing_description(self):
        category_data = {
            'name': 'Test Category'
        }
        response = self.client().post('/api/v1/menu_category/', json=category_data)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['message'], 'Description is required')

    def test_create_menu_category_already_exists(self):
        MenuCategory(name='Test Category', description='Test Description').insert()
        response = self.client().post('/api/v1/menu_category/', json=self.category_data)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['message'], 'Menu category already exists')



if __name__ == '__main__':
    unittest.main()