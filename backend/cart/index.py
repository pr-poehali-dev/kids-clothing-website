'''
Business: API корзины - добавление, удаление, получение товаров в корзине
Args: event с httpMethod, headers для session_id, body с данными товара
Returns: JSON с содержимым корзины
'''
import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    headers = event.get('headers', {})
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    session_id = headers.get('x-session-id') or headers.get('X-Session-Id', 'anonymous')
    
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        cursor.execute('''
            SELECT 
                ci.id, ci.product_id, ci.size, ci.quantity,
                p.name, p.price, p.image_url, p.category
            FROM cart_items ci
            JOIN products p ON ci.product_id = p.id
            WHERE ci.session_id = %s
        ''', (session_id,))
        
        items = cursor.fetchall()
        cart_items = []
        total = 0
        
        for item in items:
            cart_items.append({
                'id': item['id'],
                'productId': item['product_id'],
                'name': item['name'],
                'price': item['price'],
                'image': item['image_url'],
                'category': item['category'],
                'size': item['size'],
                'quantity': item['quantity']
            })
            total += item['price'] * item['quantity']
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'items': cart_items,
                'total': total,
                'count': len(cart_items)
            })
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        product_id = body_data.get('productId')
        size = body_data.get('size')
        quantity = body_data.get('quantity', 1)
        
        cursor.execute('''
            SELECT id, quantity FROM cart_items 
            WHERE session_id = %s AND product_id = %s AND size = %s
        ''', (session_id, product_id, size))
        
        existing = cursor.fetchone()
        
        if existing:
            new_quantity = existing['quantity'] + quantity
            cursor.execute('''
                UPDATE cart_items SET quantity = %s 
                WHERE id = %s
            ''', (new_quantity, existing['id']))
        else:
            cursor.execute('''
                INSERT INTO cart_items (session_id, product_id, size, quantity)
                VALUES (%s, %s, %s, %s)
            ''', (session_id, product_id, size, quantity))
        
        conn.commit()
        
        cursor.execute('''
            SELECT COUNT(*) as count FROM cart_items WHERE session_id = %s
        ''', (session_id,))
        
        count = cursor.fetchone()['count']
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'count': count
            })
        }
    
    if method == 'DELETE':
        params = event.get('queryStringParameters') or {}
        item_id = params.get('id')
        
        if item_id:
            cursor.execute('''
                DELETE FROM cart_items WHERE id = %s AND session_id = %s
            ''', (int(item_id), session_id))
            conn.commit()
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True})
        }
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
