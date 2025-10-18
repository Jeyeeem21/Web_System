//creating and nesting components

// function myButton() {
//     return (
//         <button>i am a button</button>
//     );
// }

// const user = {
//     name: 'Juan Dela Cruz',
//     age: 19,
// }
// export default function primaryButton(){
//     return (
//     <div>
//         <h1 className="avatar">welcome to my app {user.name+ " " + user.age}</h1>
//         <myButton/>
//     </div>
//     );
// }


import React from 'react';

const PrimaryButton = ({label, onClick, type = "button"}) => {
    return (
        <button 
        type = {type}
        onClick = {onClick}
        className='bg-gradient-to-r from indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold'
        >
            {label}
        </button>
    );

}
export default PrimaryButton;