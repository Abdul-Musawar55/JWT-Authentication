const express = require("express");
const app = express();
const {protect} = require("./middlewares/auth.middleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", require("./routes/user.route"))


app.get("/secure", protect, (req, res) => {
    res.send({ message: "Protected route accessed!", user: req.user });
});



// app.get("/", (req,res) =>{
//     res.json({message: "Hello world!"})
// })

// app.get("/sum", (req, res) => {
//     const { num1, num2 } = req.query;
    
//     if (!num1 || !num2) {
//         return res.status(400).json({
//             isSuccess: false,
//             message: "num1 and num2 are required!"
//         });
//     }
    
//     if (isNaN(num1) || isNaN(num2)) {
//         return res.status(400).json({
//             isSuccess: false,
//             message: "num1 and num2 must be numbers!"
//         });
//     }

//     const sum = Number(num1) + Number(num2);

//     res.status(200).json({
//         isSuccess: true,
//         message: `The sum of ${num1} and ${num2} is ${sum}`,
//         data: sum
//     });
// });

// app.get("/multiply", (req, res) => {
//     const { num1, num2 } = req.query;
    
//     // Missing numbers
//     if (!num1 || !num2) {
//         return res.status(400).json({
//             isSuccess: false,
//             message: "Please provide both num1 and num2!"
//         });
//     }
    
//     // Not numbers
//     if (isNaN(num1) || isNaN(num2)) {
//         return res.status(400).json({
//             isSuccess: false,
//             message: "num1 and num2 must be valid numbers!"
//         });
//     }
    
//     const product = Number(num1) * Number(num2);
    
//     return res.status(200).json({
//         isSuccess: true,
//         message: `The product of ${num1} and ${num2} is ${product}`,
//         data: product
//     });
// });
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`)
})