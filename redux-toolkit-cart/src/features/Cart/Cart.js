import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./Cart.module.css"
import { fetchCart,addCart,clearErrorStatuses,updateCart,deleteCart } from './cartSlice'

function Cart() {
  const idRef=useRef()
  const quantityRef=useRef()
  const dispatch=useDispatch()
  const state=useSelector(state=>state.cartReducer)
  const [btnText,setBtnText]=useState("Add to Cart");

useEffect(()=>{
  dispatch(fetchCart());
},[])

useEffect(()=>{
  if(state.updatedStatus||state.addedStatus || state.deletedStatus){
  setTimeout(()=>{dispatch(clearErrorStatuses())},2000)
  }
},[state.updatedStatus,state.deletedStatus,state.addedStatus])

const addCartN=(e)=>{
  e.preventDefault();
  if(idRef.current.value!=="" && quantityRef.current.value!==""){
  let obj={ userId: 1,products:[{id: idRef.current.value,quantity: quantityRef.current.value,}]}
  if(btnText==="Add to Cart"){
  dispatch(addCart(obj))
  }
  else if(btnText==="Update Cart"){
    dispatch(updateCart(obj))
    setBtnText("Add to Cart")
  }
  idRef.current.value="";
  quantityRef.current.value=""
}
else{
  alert("Please fill all the fields.")
}
}

const updateCartN=(quantity,id)=>{
  idRef.current.value=id;
  quantityRef.current.value=quantity
  setBtnText("Update Cart")
}


  return (
    <div id={styles.cartParent}> <h2>Add to Cart</h2>
        <hr/>
        <form id={styles.addProductForm}>
            <label>Product Id:</label>
            <input type="number" ref={idRef} name="productId" placeholder='Product Id'/>
            <label>Quantity:</label>
            <input type="number" ref={quantityRef} name="quantity" placeholder='Quantity'/>
            <button id={styles.btnAdd} onClick={addCartN}>{btnText}</button>
        </form>
        <hr/>
        <div id={styles.cart}>
          {(state.loading)?<img id={styles.loader} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"/>:""}
          {(state.addedStatus==="")?"":(state.addedStatus===false)?<div id={styles.errorDiv} className={styles.messagesDiv}><h6>Error!</h6><p> Error in adding to cart.</p></div>:<div id={styles.successDiv} className={styles.messagesDiv}><h6>Success!</h6><p> Item added successfully.</p></div>}
          {(state.updatedStatus==="")?"":(state.updatedStatus===false)?<div id={styles.errorDiv} className={styles.messagesDiv}><h6>Error!</h6><p> Error in updating the cart.</p></div>:<div id={styles.successDiv} className={styles.messagesDiv}><h6>Success!</h6><p> Cart updated successfully.</p></div>}
          {(state.deletedStatus==="")?"":(state.deletedStatus===false)?<div id={styles.errorDiv} className={styles.messagesDiv}><h6>Error!</h6><p> Error in deleting the cart.</p></div>:<div id={styles.successDiv} className={styles.messagesDiv}><h6>Success!</h6><p> Cart deleted successfully.</p></div>}
        <h2>Shopping Cart</h2>
        <hr/>
        <button id={styles.btnDelete} onClick={()=>{dispatch(deleteCart())}}>Delete Cart</button>
        <table id={styles.cartTable}>
            <tbody>
                <tr><th>S. No.</th><th>Title</th><th>Quantity</th><th>Action</th><th>Price</th></tr>
                {state.products && state.products.map((item,i)=>{return(<tr key={item.id}><td>{i}</td><td>{item.title}</td><td><input  className='inpQuantity' readOnly value={item.quantity}/></td><td><button className={styles.btnUpdate} onClick={()=>{updateCartN(item.quantity,item.id)}}>Update</button></td><td>{item.total}</td></tr>)})}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default Cart