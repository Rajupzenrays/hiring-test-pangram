import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import snowflake from "snowflake-sdk";
const { createConnection } = snowflake;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

const con = createConnection({
  account: "mhglgms-ib59390",
  username: "RAJU",
  password: "Raju@123",
  database: "IPANGRAM",
  schema: "",
  warehouse: "COMPUTE_WH",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

con.connect((err, conn) => {
  if (err) {
    console.log("Error in connection");
  } else {
    console.log("Connected");
  }
});
app.post("/employee", (req, res) => {
  const details = req.body;
  console.log("details", details);
  const insertEmployeeQuery = `INSERT INTO employee(NAME, EMAIL, GENDER, HOBBY, PASSWORD) 
    VALUES (?, ?, ?, ?, ?)`;

  const insertEmployeeValues = [
    `${details.firstName} ${details.lastName}`,
    details.email,
    details.gender,
    details.hobbies,
    details.password,
  ];

  con.execute({
    sqlText: insertEmployeeQuery,
    binds: insertEmployeeValues,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error(`Error inserting employee: ${err.message}`);
        return res.status(500).json({ Error: "Insert employee error in SQL" });
      }
      return res.json({ Status: "Success" });
    },
  });
});

app.post("/manager", (req, res) => {
  const details = req.body;

  const insertEmployeeQuery = `INSERT INTO manager(NAME, EMAIL, GENDER, HOBBY, PASSWORD) 
    VALUES (?, ?, ?, ?, ?)`;

  const insertEmployeeValues = [
    `${details.firstName} ${details.lastName}`,
    details.email,
    details.gender,
    details.hobbies,
    details.password,
  ];

  con.execute({
    sqlText: insertEmployeeQuery,
    binds: insertEmployeeValues,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error(`Error inserting employee: ${err.message}`);
        return res.status(500).json({ Error: "Insert employee error in SQL" });
      }
      return res.json({ Status: "Success" });
    },
  });
});

app.get("/getEmployee", (req, res) => {
  const sql = "SELECT * FROM employee";
  con.execute({
    sqlText: sql,
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Error: "Get employee error in SQL" });
      }
      return res.json({ Status: "Success", Result: rows });
    },
  });
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM employee WHERE id = ${id}`;
  console.log(sql);
  con.execute({
    sqlText: sql,
    binds: [id],
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Error: "Get employee error in SQL" });
      }
      return res.json({ Status: "Success", Result: rows });
    },
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const details = req.body;
  console.log("department", details, id);

  const sql = `UPDATE employee SET DEPARTMENT ='${details.department}', NAME = '${details.name}', EMAIL  = '${details.email}', SALARY = '${details.salary}' WHERE id = ${id}`;
  console.log(sql);
  const values = [...Object.values(details), id];

  con.execute({
    sqlText: sql,
    binds: values,
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Error: "Update employee error in SQL" });
      }
      return res.json({ Status: "Success" });
    },
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM employee WHERE id = ${id}`;
  con.execute({
    sqlText: sql,
    complete: (err, stmt) => {
      if (err) return res.json({ Error: "Delete employee error in SQL" });
      return res.json({ Status: "Success" });
    },
  });
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are no Authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token wrong" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id });
});

app.get("/adminCount", (req, res) => {
  const sql = "SELECT COUNT(id) as admin FROM manager";
  con.execute({
    sqlText: sql,
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Error: "Error in running query" });
      }
      return res.json(rows[0]);
    },
  });
});

app.get("/employeeCount", (req, res) => {
  const sql = "SELECT COUNT(id) as employee FROM employee";
  con.execute({
    sqlText: sql,
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Error: "Error in running query" });
      }
      return res.json(rows);
    },
  });
});

app.get("/salary", (req, res) => {
  const sql = "SELECT SUM(salary) AS sumOfSalary FROM employee";
  con.execute({
    sqlText: sql,
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Status: "Error", Error: "Error in running query" });
      }
      return res.json(rows);
    },
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM manager WHERE email = ? AND password = ?";
  con.execute({
    sqlText: sql,
    binds: [req.body.email, req.body.password],
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Status: "Error", Error: "Error in running query" });
      }
      if (rows.length > 0) {
        const id = rows[0].ID;
        const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
          expiresIn: "1d",
        });
        res.cookie("token", token);
        return res.json({ Status: "Success" });
      } else {
        return res.json({ Status: "Error", Error: "Wrong Email or Password" });
      }
    },
  });
});

app.post("/employeelogin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sql = `SELECT * FROM employee WHERE email = '${email}' AND password = '${password}'`;
  con.execute({
    sqlText: sql,
    binds: [email, password],
    complete: (err, stmt, rows) => {
      if (err) {
        return res.json({ Status: "Error", Error: "Error in running query" });
      }
      if (rows.length > 0) {
        const id = rows[0].ID;
        const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
          expiresIn: "1d",
        });
        res.cookie("token", token);
        return res.json({ Status: "Success", id });
      } else {
        return res.json({ Status: "Error", Error: "Wrong Email or Password" });
      }
    },
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

app.post("/create", (req, res) => {
  console.log("req.body-->", req.body);

  if (req.body.password === undefined) {
    return res.json({ Error: "Password is undefined" });
  }

 

    const sql = "INSERT INTO employee (name, email, password, salary) VALUES (?, ?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password, req.body.salary];

    try {
      con.execute({
        sqlText: sql,
        binds: values,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error("Error executing statement:", err);
            return res.json({ Error: "Error in signup query" });
          }
          console.log(`Number of rows inserted: ${rows}`);
          return res.json({ Status: "Success" });
        },
      });
    } catch (err) {
      console.error("Error in executing statement:", err);
      return res.json({ Error: "Error in signup query" });
    }

});

app.listen(8081, () => {
  console.log("Running");
});
