// import { User, UserStore } from '../models/user';

// const store = new UserStore();
// const user:User = {
//   username:'test_user',
//   password:'test_password'
// }
// describe('User Model', () => {
//   it('should have an index method', () => {
//     expect(store.index).toBeDefined();
//   });

//   it('should have a show method', () => {
//     expect(store.show).toBeDefined();
//   });

//   it('should have a create method', () => {
//     expect(store.create).toBeDefined();
//   });
//   it('should have a login method', () => {
//     expect(store.login).toBeDefined();
//   });
//   it('should have a delete method', () => {
//     expect(store.delete).toBeDefined();
//   });
// });

// describe('User Model', ()=>{
//   it('should return a result with length equal 2', async()=>{
//     const result = await store.index();
//     expect(result.length).toBe(2)
//   })
//   it('should return a result with a username=abdulaziz', async()=>{
//     const result = await store.show('abdulaziz');
//     expect(result.username).toBe('abdulaziz')
//   })
//   it('should return result with length=3 after creating a new product', async()=>{
//     await store.create(user)
//     const result = await store.index()
//     expect(result.length).toBe(3)
//   })
//   it('should login successfully', async()=>{
//     const user:User = {
//       username:'abdulaziz',
//       password:'foo-password-hashed'
//     }
//     const result = await store.login(user)
//     expect(result).not.toBeNull()
//   })
//   it('should delete a user successfully by checking the length after the delete action', async()=>{
//     await store.delete('abdulaziz')
//     const result = await store.index()
//     expect(result.length).toBe(2)
//   })
// })
