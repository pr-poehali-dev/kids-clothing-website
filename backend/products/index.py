'''
Business: API для работы с товарами - получение списка, фильтрация, поиск
Args: event с httpMethod, queryStringParameters для фильтров
Returns: JSON с товарами или ошибкой
'''
import json
import os
from typing import Dict, Any, List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Session-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        
        gender = params.get('gender')
        age_group = params.get('age_group')
        min_price = params.get('min_price')
        max_price = params.get('max_price')
        
        query = '''
            SELECT 
                p.id, p.name, p.price, p.old_price, p.image_url,
                p.category, p.gender, p.age_group, p.is_new,
                ARRAY_AGG(ps.size ORDER BY ps.size) as sizes
            FROM products p
            LEFT JOIN product_sizes ps ON p.id = ps.product_id
            WHERE 1=1
        '''
        
        conditions = []
        if gender and gender != 'all':
            genders = gender.split(',')
            gender_conditions = ' OR '.join([f"p.gender = '{g}'" for g in genders])
            conditions.append(f"({gender_conditions} OR p.gender = 'unisex')")
        
        if age_group and age_group != 'all':
            age_groups = age_group.split(',')
            age_conditions = ' OR '.join([f"p.age_group = '{a}'" for a in age_groups])
            conditions.append(f"({age_conditions})")
        
        if min_price:
            conditions.append(f"p.price >= {int(min_price)}")
        
        if max_price:
            conditions.append(f"p.price <= {int(max_price)}")
        
        if conditions:
            query += ' AND ' + ' AND '.join(conditions)
        
        query += ' GROUP BY p.id ORDER BY p.created_at DESC'
        
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(query)
        products = cursor.fetchall()
        cursor.close()
        conn.close()
        
        products_list = []
        for p in products:
            products_list.append({
                'id': p['id'],
                'name': p['name'],
                'price': p['price'],
                'oldPrice': p['old_price'],
                'image': p['image_url'],
                'category': p['category'],
                'gender': p['gender'],
                'ageGroup': p['age_group'],
                'isNew': p['is_new'],
                'sizes': p['sizes'] or []
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'products': products_list})
        }
    
    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }
