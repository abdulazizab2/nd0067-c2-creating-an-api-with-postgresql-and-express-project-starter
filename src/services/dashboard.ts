// //@ts-ignore
// import client from '../database';
// import { Order } from '../models/order';

// export class DashboardQueries {
//     async completedUserOrders(id: string): Promise<Order[]> {
//         try {
//             // @ts-ignore
//             const conn = await client.connect()
//             const status = 'active'
//             const sql = 'SELECT * FROM orders INNER JOIN users ON orders.username = users.username WHERE orders.status=($1)'
//             const result_1 = conn.query(sql)
//         }
//     }
// }