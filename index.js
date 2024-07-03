const readline = require("readline");
const query = require("./helper");
const { exit } = require("process");

const Interface1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

Interface1.question(
  "Which type of Operation you want to perform [insert, select, update, delete, read]  ===> ",
  (option) => {
    let optionValue = option.toLocaleLowerCase();

    const Interface = {
      insert: () => {
        Interface1.question("Enter id  : ", (id) => {
          Interface1.question("Enter the name : ", (name) => {
            Interface1.question("Enter the Salary : ", (salary) => {
              if (id == "") {
                query.insert({
                  name,
                  salary,
                });
              } else {
                query.insert({
                  id,
                  name,
                  salary,
                });
              }
              Interface1.close();
            });
          });
        });
      },

      select: () => {
        Interface1.question("Enter the key name : ", (keyName) => {
          Interface1.question(
            `Enter ${keyName} to find the record : `,
            (value) => {
              console.log("response ==> ", query.select(keyName, value));
              Interface1.close();
            }
          );
        });
      },

      
      // update: () => {
      //   Interface1.question("Enter the key name to update : ", (keyName) => {
      //     Interface1.question(
      //       `Enter ${keyName} to find the record and update : `,
      //       (value) => {
      //         console.log("response ==> ", query.select(keyName, value));
      //         Interface1.question('Enter new Name : ', (newName)=>{

      //           Interface1.question('Enter new Salary : ', (Newsalary)=>{
      //               if(newName=='' && Newsalary==''){
      //                   console.log('Please fill upated value');
      //                   exit()
      //               }
      //               query.update({
      //                   id,
      //                   name:newName,
      //                   salary:Newsalary
      //               })
      //           })
      //       })

      //       }

           
      //     );
      //   });
      // },

      update :()=>{
        Interface1.question('Enter the id ==> ', (id)=>{
          Interface1.question('Enter name : ', (name)=>{
            Interface1.question('Enter salary : ', (salary)=>{
              let data = {
                id,
                name:name,
                salary:salary,
              }

              console.log("Data ==> ", data);
              console.log(query.update(id,data))
              exit()
            })
          })
        })
      },

      delete :()=>{
        Interface1.question('Enter the id ==> ', (id)=>{
            
             

              console.log(query.delete(id))
              exit()
        })
      },

      read :()=>{
            
             
console.log('All data read ==>');
              console.log(query.read())
              exit()
      }
    };

    if (Interface[optionValue]) {
      Interface[optionValue]();
    }
    else{
        console.log('Inavlid Option');
        Interface1.close()
    }
  }
);
