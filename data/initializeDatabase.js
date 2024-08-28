const fs = require('fs');
const mongoose = require('mongoose');
const Student = require('../models/studentRecord.js');

//load student data from JSON file
async function loadStudentData(){
    return new Promise((resolve, reject) => {
    fs.readFile('students.json', 'utf-8', (err, data) =>{
        if(err){
          return reject(err);
        }

        resolve(JSON.parse(data));
    });
  });
}

//Initiate the database
async function initializeDatabase(){
    try{
        const students = await loadStudentData();

     


        for(const student in students){
            //Check to see if the student already exists
            const existingStudent = await Student.findOne({email: student.email});

          if(!existingStudent){
            await Student.create(student);
            console.log(`Student with email ${student.email} has been inserted`);
          } else{
            console.log(`Student with email ${student.email} already exists`);
          }

        }
        console.log('Database initialization complete.')
    }catch(err){
      console.error('Error initializing database', err);
    }
  };

  module.exports = initializeDatabase;