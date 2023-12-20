"""empty message

Revision ID: 52257152d1f3
Revises: 
Create Date: 2023-12-19 03:04:17.389600

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '52257152d1f3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('house_address', sa.String(length=500), nullable=True))
        batch_op.add_column(sa.Column('last_login', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('last_login')
        batch_op.drop_column('house_address')

    # ### end Alembic commands ###