const mysql = require("mysql");

const conn= mysql.createPool({
    connectionLimit:10,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password: process.env.DB_PASS || '', // Set to an empty string if no password or omit it
    database: process.env.DB_NAME

});

 exports.view= (req,res)=>{
    conn.getConnection((err, connection)=>{
            if (err) throw err; // not connected!
            connection.query("select *  from addstudent",(err,rows)=>{
                connection.release();
                if(!err){
                    res.render("home",{rows});
                }
                else{
                    console.log("Error is presented" +err);
                }
            });
        });
 };

 exports.addstudent =(req, res)=>{
    res.render("addstudent");
 }

 exports.save =(req, res)=>{
    conn.getConnection((err, connection)=>{
        if (err) throw err; // not connected!

        const {name,age,place} =req.body;
        connection.query("insert into addstudent(name,age, place) values(?,?,?)",[name,age,place],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("addstudent");
                res.redirect('/');
            }
            else{
                console.log("Error is presented" +err);
            }
        });
    });
 }; 

 exports.editstudent= (req,res)=>{
    conn.getConnection((err, connection)=>{
        if (err) throw err; // not connected!

        let id=req.params.id;

        connection.query("select *  from addstudent where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("editstudent",{rows});
            }
            else{
                console.log("Error is presented" +err);
            }
        });
    });
 }




 
 exports.edit =(req, res)=>{
    conn.getConnection((err, connection)=>{
        if (err) throw err; // not connected!

        const {name,age,place} =req.body;
        let id=req.params.id;

        connection.query("update addstudent set name=?,age=?, place=? where id=?",[name,age,place,id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render("addstudent");
                res.redirect('/');
            }
            else{
                console.log("Error is presented" +err);
            }
        });
    });
 }; 


 exports.deletestudent=(req,res)=>{
    conn.getConnection((err, connection)=>{
        if (err) throw err; // not connected!

        let id=req.params.id;

        connection.query("delete from addstudent where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                
                res.redirect('/');
            }
            else{
                console.log("Error is presented" +err);
            }
        });
    });
 };