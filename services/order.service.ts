import { localOrders, localOwnerships, localBeats, localUsers, logActivity } from './db';
import { Order, Ownership } from '../types/admin';

export async function getOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [...localOrders];
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return localOrders.find(order => order.id === id);
}

// Purchase Workflow Action: Create Ownership records for order items
function processCompletedOrderItems(order: Order) {
  const customer = localUsers.find(u => u.id === order.customerId);
  const customerName = customer ? customer.name : 'Customer';

  order.beatIds.forEach(beatId => {
    const beat = localBeats.find(b => b.id === beatId);
    const beatTitle = beat ? beat.title : 'Beat';
    const pricePaid = beat ? beat.price : 0;

    // 1. Create ownership record if not already exists
    const exists = localOwnerships.some(own => own.beatId === beatId && own.customerId === order.customerId);
    if (!exists) {
      const newOwnership: Ownership = {
        id: `own_${Math.random().toString(36).substr(2, 9)}`,
        beatId,
        customerId: order.customerId,
        licenseType: 'exclusive', // Exclusive license only
        purchasedAt: new Date().toISOString(),
        pricePaid: pricePaid,
        transactionId: `txn_${Math.floor(100000000 + Math.random() * 900000000)}`
      };
      localOwnerships.push(newOwnership);

      // Log ownership assignments
      logActivity(`Ownership license assigned for "${beatTitle}" to customer ${customerName}`, 'ownership');
      logActivity(`Beat "${beatTitle}" marked as SOLD`, 'beat');
    }
  });
}

// Refund Workflow Action: Remove ownership records for order items
function processRefundedOrderItems(order: Order) {
  order.beatIds.forEach(beatId => {
    const beat = localBeats.find(b => b.id === beatId);
    const beatTitle = beat ? beat.title : 'Beat';

    // 1. Delete the ownership record matching this customer & beat
    const initialLen = localOwnerships.length;
    const index = localOwnerships.findIndex(own => own.beatId === beatId && own.customerId === order.customerId);
    if (index !== -1) {
      localOwnerships.splice(index, 1);
      
      logActivity(`Ownership revoked for "${beatTitle}" due to order refund`, 'ownership');
      logActivity(`Beat "${beatTitle}" marked as AVAILABLE`, 'beat');
    }
  });
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const newOrder: Order = {
    ...orderData,
    id: `ord_${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString()
  };

  localOrders.push(newOrder);

  // Log order creation
  const customer = localUsers.find(u => u.id === newOrder.customerId);
  const customerName = customer ? customer.name : 'Customer';
  logActivity(`Order #${newOrder.id} logged as ${newOrder.status} for customer ${customerName} ($${newOrder.totalAmount.toFixed(2)})`, 'order');

  // Trigger side effects if order is COMPLETED
  if (newOrder.status === 'COMPLETED') {
    processCompletedOrderItems(newOrder);
  }

  return newOrder;
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const orderIndex = localOrders.findIndex(o => o.id === id);
  if (orderIndex === -1) {
    throw new Error(`Order with ID ${id} not found`);
  }

  const oldStatus = localOrders[orderIndex].status;
  localOrders[orderIndex].status = status;
  const updatedOrder = localOrders[orderIndex];

  // Log status change
  logActivity(`Order #${id} status changed from ${oldStatus} to ${status}`, 'order');

  // Handle business flows
  if (status === 'COMPLETED' && oldStatus !== 'COMPLETED') {
    processCompletedOrderItems(updatedOrder);
  } else if (status === 'REFUNDED' && oldStatus === 'COMPLETED') {
    processRefundedOrderItems(updatedOrder);
  }

  return updatedOrder;
}

export async function deleteOrder(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = localOrders.findIndex(o => o.id === id);
  if (index === -1) return false;

  const order = localOrders[index];
  
  // If it was completed, we revoke items first
  if (order.status === 'COMPLETED') {
    processRefundedOrderItems(order);
  }

  localOrders.splice(index, 1);
  logActivity(`Order #${id} deleted/cancelled by administrator`, 'system');
  return true;
}
