import React, { useState } from 'react';
import styles from './Register.module.css';
import defaultRecipe from '../../data/default-recipe';
import { createRecipe } from '../../sercives/recipe/recipe-services';
import { useNavigate } from 'react-router';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';


// Ingredients and Steps adapted from https://github.com/nishant-666/Dynamic-Forms/blob/master/src/App.js

const Ingredients = ([newRecipe, setNewRecipe]) => {
  const [formFields, setFormFields] = useState([
    { ingredient: '', amount: '', measurement: '' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    setNewRecipe({ ...newRecipe, ingredients: e })
  }

  const addFields = () => {
    let object = {
      ingredient: '',
      amount: '',
      measurements: '',
    }

    setFormFields([...formFields, object])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className="App">
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index}>
              <input
                name='ingredient'
                placeholder='ingredient'
                onChange={event => handleFormChange(event, index)}
                value={form.ingredient}
              />
              <input
                name='amount'
                placeholder='amount'
                onChange={event => handleFormChange(event, index)}
                value={form.amount}
              />
              <input
                name='measurement'
                placeholder='measurement'
                onChange={event => handleFormChange(event, index)}
                value={form.measurement}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
      </form>
      <button onClick={addFields}>Add More..</button>
      <br />
      <button onClick={submit}>Save Ingredients</button>
    </div>
  );
}

const Steps = ([newRecipe, setNewRecipe]) => {
  const [formFields, setFormFields] = useState([
    '',
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    setNewRecipe({ ...newRecipe, steps: e })
  }

  const addFields = () => {
    setFormFields([...formFields, ''])
  }

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }

  return (
    <div className="App">
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index}>
              <input
                name='step'
                placeholder='step'
                onChange={event => handleFormChange(event, index)}
                value={form.name}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          )
        })}
      </form>
      <button onClick={addFields}>Add More..</button>
      <br />
      <button onClick={submit}>Save Steps</button>
    </div>
  );
}


const MakeRecipe = (imageId = '') => {
  const [newRecipe, setNewRecipe] = useState(defaultRecipe);

  const { currentUser } = useSelector((state) => state.users);

  currentUser ? (currentUser.isChef ?
    setNewRecipe({ ...newRecipe, ownerId: currentUser._id })
    : setNewRecipe({ ...newRecipe, ownerId: 'unknown' }))
    : setNewRecipe({ ...newRecipe, ownerId: 'unknown' });

  setNewRecipe({ ...newRecipe, image: imageId })

  const navigate = useNavigate()
  const createNewRecipe = async () => {
    const response = await createRecipe(newRecipe);
    navigate('/profile')
  }

  const handleOnChange1 = (e) => {
    console.log("at 1")
    setNewRecipe({ ...newUser, isChef: false })
  }

  const handleOnChange2 = (e) => {
    console.log("at 2")
    setNewUser({ ...newUser, isChef: true })
  }

  return (
    < div className={styles.Register} >
      <h4 className='mt-4 mb-3'>Register New User</h4>

      {/* Recipe title row */}
      <div className='row mb-2'>
        <div className='col-12'>
          <div className='form-floating'>
            <input
              value={newUser.firstName} onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
              id='recipe_title' type="text" className="form-control" placeholder="Recipe Title" aria-label="Recipe Title" />
            <label for='recipe_title'>Title</label>
          </div>
        </div>
      </div>

      {/* description row */}
      <div className='row mb-2'>
        <div className='col-6'>
          <div className='form-floating'>
            <input
              value={newUser.email} onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
              id='description' type="text" className="form-control" placeholder="About the recipe" aria-label="Description" />
            <label for='description'>Description</label>
          </div>
        </div>
      </div>

      {/* username and password row */}
      <div className='row mb-2'>
        <Ingredients></Ingredients>
      </div>
      <div className='row mb-2'>
        <Steps></Steps>
      </div>

      <div className='row mb-2'>
        <div className='col-12'>
          <button className='btn btn-success float-end' onClick={createNewRecipe}>Create</button>
        </div>
      </div>

    </div >
  )
};

MakeRecipe.propTypes = {};

MakeRecipe.defaultProps = {};

export default MakeRecipe;