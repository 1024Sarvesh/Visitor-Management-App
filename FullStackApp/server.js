import express from "express";
import "dotenv/config"
import Connectdb from "./src/modles/db.js";
import { Visitor } from "./src/modles/Schema.js";
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())
Connectdb()

app.get("/allvisitors", async (req, res) => {

    const AllVisitor = await Visitor.find()
    console.log(AllVisitor)

    res.json({
        visitor: AllVisitor
    })
})

app.get("/visitors/:id", async (req, res) => {
    const id = req.params.id
    const getById = await Visitor.findById(id)
    console.log(getById)

    res.json({
        visitorById: getById
    })
})

app.patch("/visitors/:id", async (req, res) => {
    const id = req.params.id
    const { name, email, gender, address, mobileNo, purpose, remarks } = req.body;
    try {
        const UpdateVisitor = await Visitor.findByIdAndUpdate(
            id,
            { name, email, gender, address, mobileNo, purpose, remarks },
            {
                new: true,
                runValidators: true
            }
        )
        if (!UpdateVisitor) {
            console.log("No user found with that ID.");
            return null;
        }

        console.log("Updated User:", UpdateVisitor);
        res.json({
            msg: "Visitor data updated",
            visitor: UpdateVisitor
        });
    } catch (error) {
        console.error("Something Error In Visitor Upadate", error);
    }


})

app.delete("/visitors/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const DeletedVisitor = await Visitor.findByIdAndDelete(
            id,
            {
                new: true,
                runValidators: true
            }

        )
        console.log("Deleted User:",DeletedVisitor );
    res.json({
        msg: "Visitor data Deleted",
        visitor: DeletedVisitor
    });
    } catch (error) {
        console.log("Something error in Visitor Delete",error)
    }
})

app.post("/visitors", async (req, res) => {

    const visitor = new Visitor({

        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        address: req.body.address,
        mobileNo: req.body.mobileNo,
        purpose: req.body.purpose,
        date_and_time: req.body.date_and_time,
        remarks: req.body.remarks,

    })

    const StoredVisitor = await visitor.save()

    res.json({
        msg: "Visitor Created Successfully",
        Visitor: StoredVisitor
    })
})


const HostName = "127.0.0.1"
const PORT = process.env.PORT || 5000

app.listen(PORT, HostName, () => {
    console.log(`Server is running on http://${HostName}:${PORT}`)
})