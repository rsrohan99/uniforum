import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_API_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      
      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;

////
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Fetch user data when the component mounts or when userId changes
    async function fetchUser() {
      const response = await fetch(`https://api.example.com/users/${userId}`);
      const data = await response.json();
      setUser(data);
    }

    fetchUser();
  }, [userId]);

  if (!user) { //i have a table name comments,it has field post id..now i want to make a query to count total cmments of every post and sort them using supabase database
    return <p>Loading user profile...</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your credentials
const supabase = createClient('your-supabase-url', 'your-supabase-api-key');

async function fetchCommentsCountAndSort() {
  try {
    // Use SQL to count total comments for each post and sort them
    const { data, error } = await supabase
      .from('comments')
      .select('post_id, count(*) as total_comments')
      .group('post_id')
      .order('total_comments', { ascending: false });

    if (error) {
      throw error;
    }

    // `data` now contains the sorted post_id and total_comments

    // You can map through `data` to display the results
    const result = data.map((row) => (
      <div key={row.post_id}>
        <p>Post ID: {row.post_id}</p>
        <p>Total Comments: {row.total_comments}</p>
      </div>
    ));

    // Return the result
    return result;
  } catch (error) {
    // Handle errors here
    console.error('Error fetching comments:', error);
    return <p>Error fetching comments</p>;
  }
}

// Call the function to fetch and display comments
const commentsCount = fetchCommentsCountAndSort();

return (
  <div>
    {commentsCount ? commentsCount : <p>Loading user profile...</p>}
  </div>
);
onst { data, error } = await clientSupabase
  .from('comments')
  .select('post_id, count(*) as total_comments')
  .group('post_id' as any) // Explicitly specify 'group' as a valid method
  .order('total_comments', { ascending: false });
