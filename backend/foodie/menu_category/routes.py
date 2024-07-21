from flask import Blueprint, request, jsonify
from foodie import db
from foodie.db_utils import IdSchema
from foodie.models.menu_category import MenuCategory
from uuid import UUID

menu_category_bp = Blueprint('menu_category', __name__, url_prefix='/api/v1/menu_category')


@menu_category_bp.route('/', methods=['GET'])
def get_menu_categories():
    """
    Retrieves all menu categories and their associated menu items.

    Returns:
        A JSON response containing the menu categories and associated menu items.
        The response has the following structure:
        {
            'menu_categories': [
                {
                    'menu_category_id': int,
                    'name': str,
                    'description': str,
                    'menu_items': [
                        {
                            'menu_item_id': int,
                            'name': str,
                            'description': str,
                            'price': float
                        },
                        ...
                    ]
                },
                ...
            ],
            'message': str,
            'total_menu_categories': int,
            'total_menu_items': int
        }

        - If there are no menu categories, the 'menu_categories' field will be an empty list.
        - If there are no menu items under a category, the 'menu_items' field will be an empty list.

        The HTTP status code of the response indicates the success or failure of the request:
        - 200: Success.
        - 404: Menu categories not found.
    """
    menu_categories = MenuCategory.query.all()
    if not menu_categories:
        return jsonify({
            'message': 'Menu categories not found',
            'menu_categories': []
        }), 404
    menu_categories_data = []
    total_menu_items = 0

    for category in menu_categories:
        category_data = {
            'menu_category_id': category.id,
            'name': category.name,
            'description': category.description,
            'menu_items': [item.format() for item in category.menu_items]
        }
        total_menu_items += len(category.menu_items)
        menu_categories_data.append(category_data)

    return jsonify({
        'menu_categories': menu_categories_data,
        'message': 'Menu categories retrieved successfully',
        'total_menu_categories': len(menu_categories_data),
        'total_menu_items': total_menu_items
    }), 200



# Route to create a new menu category
@menu_category_bp.route('/', methods=['POST'])
def create_menu_category():
   """
   Create a new menu category.

   Parameters:
   - None

   Returns:
   - A JSON response with a success message and the newly created menu category in the format: {'message': str, 'category': dict}

   Raises:
   - 400 Bad Request if the 'name' field is missing or empty, or if the 'description' field is missing or empty.
   - 400 Bad Request if a menu category with the same name already exists.
   - 500 Internal Server Error if an exception occurs during the creation of the menu category.
   """
   try:
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')

        if not name:
            return jsonify({'message': 'Name is required'}), 400
        if not description:
            return jsonify({'message': 'Description is required'}), 400

        if MenuCategory.query.filter_by(name=name).first():
            return jsonify({'message': 'Menu category already exists'}), 400

        new_category = MenuCategory(name=name, description=description)
        new_category.insert()
        return jsonify(new_category.format()), 201
   except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500

# Route to update a menu category
@menu_category_bp.route('/<menu_category_id>', methods=['PATCH'])
def update_menu_category(menu_category_id : UUID):
    """
    Update a menu category.

    Parameters:
    - menu_category_id (UUID): The ID of the menu category to be updated.

    Returns:
    - dict: A dictionary containing the updated menu category information.

    Raises:
    - 400: If the 'name' parameter is missing.
    - 404: If the menu category with the given ID is not found.
    - 500: If an exception occurs during the update process.
    """
    menu_category_id = IdSchema(id=menu_category_id).id
    try:
        data = request.get_json()
        name = data.get('name')

        if not name:
            return jsonify({'message': 'Name is required'}), 400

        category = MenuCategory.query.filter_by(id=menu_category_id).first()
        if not category:
            return jsonify({'message': 'Menu category not found'}), 404

        category.name = name
        category.update()

        return jsonify(category.format()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500

# Route to delete a menu category
@menu_category_bp.route('/<menu_category_id>', methods=['DELETE'])
def delete_menu_category(menu_category_id : UUID):
    """
    Delete a menu category.

    Args:
        menu_category_id (UUID): The ID of the menu category to be deleted.

    Returns:
        dict: A dictionary containing the status message of the deletion operation.
    """
    menu_category_id = IdSchema(id=menu_category_id).id
    try:
        category = MenuCategory.query.filter_by(id=menu_category_id).first()
        if not category:
            return jsonify({'message': 'Menu category not found'}), 404
        category.delete()
        return jsonify({'message': 'Menu category deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500