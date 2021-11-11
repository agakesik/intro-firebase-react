import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyBUwzRQxNq5p7xqekp3wMmHNXtjz_nuDWE",
  authDomain: "intro-firebase-react-6ccdd.firebaseapp.com",
  projectId: "intro-firebase-react-6ccdd",
  storageBucket: "intro-firebase-react-6ccdd.appspot.com",
  messagingSenderId: "225674993936",
  appId: "1:225674993936:web:65abf56600183ffe754595",
});

function App() {
  const [name, setName] = useState("");
  const [currentItem, setCurrentItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const db = getFirestore();
      const dbItems = await getDocs(collection(db, "items"));
      let newItems = [];
      dbItems.forEach((doc) => newItems.push(doc.data()));
      setItems(newItems);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else {
      setCurrentItem(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getFirestore();

    const docRef = await addDoc(collection(db, "items"), {
      name: name,
      item: currentItem,
    });
    console.log("Document written with ID: ", docRef.id);

    setName("");
    setCurrentItem("");
  };

  return (
    <div className="app">
      <header>
        <div className="wrapper">
          <h1>Fun Food Friends</h1>
        </div>
      </header>
      <div className="container">
        <section className="add-item">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="What's your name?"
              onChange={handleChange}
              value={name}
            />
            <input
              type="text"
              name="currentItem"
              placeholder="What are you bringing?"
              onChange={handleChange}
              value={currentItem}
            />
            <button>Add Item</button>
          </form>
        </section>
        <section className="display-item">
          <div className="wrapper">
            <ul>
              {items.map((item) => {
                return (
                  <li>
                    <h3>{item.item}</h3>
                    <p>brought by: {item.name}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
export default App;
