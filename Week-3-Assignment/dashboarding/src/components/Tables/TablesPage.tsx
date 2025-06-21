import React from 'react';
import { DataTable } from './DataTable';
import { Badge } from '../UI/Badge';

export const TablesPage: React.FC = () => {
  const usersData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2024-01-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', joinDate: '2024-01-25' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', joinDate: '2024-02-01' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', joinDate: '2024-02-05' },
  ];

  const ordersData = [
    { id: '#001', customer: 'John Doe', product: 'MacBook Pro', amount: '$2,499', status: 'Completed', date: '2024-01-15' },
    { id: '#002', customer: 'Jane Smith', product: 'iPhone 15', amount: '$999', status: 'Processing', date: '2024-01-20' },
    { id: '#003', customer: 'Bob Johnson', product: 'iPad Air', amount: '$599', status: 'Shipped', date: '2024-01-25' },
    { id: '#004', customer: 'Alice Brown', product: 'AirPods Pro', amount: '$249', status: 'Completed', date: '2024-02-01' },
    { id: '#005', customer: 'Charlie Wilson', product: 'Apple Watch', amount: '$399', status: 'Cancelled', date: '2024-02-05' },
  ];

  const userColumns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'Active' ? 'success' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'joinDate', header: 'Join Date', sortable: true },
  ];

  const orderColumns = [
    { key: 'id', header: 'Order ID', sortable: true },
    { key: 'customer', header: 'Customer', sortable: true },
    { key: 'product', header: 'Product', sortable: true },
    { key: 'amount', header: 'Amount', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true,
      render: (value: string) => {
        const variant = 
          value === 'Completed' ? 'success' :
          value === 'Processing' ? 'warning' :
          value === 'Shipped' ? 'info' :
          value === 'Cancelled' ? 'danger' : 'secondary';
        
        return <Badge variant={variant}>{value}</Badge>;
      }
    },
    { key: 'date', header: 'Date', sortable: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tables</h1>
      </div>

      <DataTable 
        title="Users Management"
        columns={userColumns}
        data={usersData}
      />

      <DataTable 
        title="Orders Management"
        columns={orderColumns}
        data={ordersData}
      />
    </div>
  );
};