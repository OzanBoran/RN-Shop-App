const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const passport = require("passport");
const session = require("express-session");
const axios = require("axios");
var bcrypt = require("bcryptjs");

const app = express();
const port = 8000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

const Member = require("./models/members");
const Order = require("./models/order");

var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyI4MjUyYjVkNjIzOTUwODQ4NmM5MjM3N2I3MGZiZjRlZmFkbV9sb2dnZWQiOnRydWUsIjgyNTJiNWQ2MjM5NTA4NDg2YzkyMzc3YjcwZmJmNGVmYWRtX3VzZXJpZCI6IjYiLCI4MjUyYjVkNjIzOTUwODQ4NmM5MjM3N2I3MGZiZjRlZmFkbV91c2VybmFtZSI6ImFwaV91c2VyIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fdXNlcmdyb3VwaWQiOiIzIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fdXNlcmlzYWRtaW4iOiIxIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9saXN0IjoiKiIsIjgyNTJiNWQ2MjM5NTA4NDg2YzkyMzc3YjcwZmJmNGVmYWRtX2F1dGhfYWRkIjoiKiIsIjgyNTJiNWQ2MjM5NTA4NDg2YzkyMzc3YjcwZmJmNGVmYWRtX2F1dGhfZWRpdCI6IioiLCI4MjUyYjVkNjIzOTUwODQ4NmM5MjM3N2I3MGZiZjRlZmFkbV9hdXRoX3ZpZXciOiIqIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9kZWwiOiIqIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9kZXRhaWwiOiIqIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9yZXBvcnQiOiIqIn0.jfLXQsL0_fu9iJA6pP4FuVSvU61P3NYWS4ueMsrllms"
);
myHeaders.append("Cookie", "ci_session=6pd9pa8uo2l37d8d94t8v5o76a6ekc7u");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "http://apitest.dogusyapimarket.com.tr/api/gettoken?username=api_user&password=API.user2024.",
  requestOptions
)
  .then((response) => response.text())
  .catch((error) => console.log("error", error));

// Function to send verification email to the user
const sendVerificationEmail = async (members_email, verificationToken) => {
  // Create a nodemailer transport
  const transporter = nodemailer.createTransport({
    // Configure the email service
    service: "gmail",
    auth: {
      user: "iambardtv@gmail.com",
      pass: "refevvrbphvqgrec",
    },
  });

  // Compose the email message
  const mailOptions = {
    from: "dogusyapimarket.com.tr",
    to: members_email,
    subject: "Emailinizi Doğrulayın",
    text: `Hesabınızı doğrulamak için lütfen linke tıklayın: http://192.168.2.237:8000/verify/${verificationToken}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verification email.", error);
  }
};

// Endpoint to register in the app
app.post("/register", async (req, res) => {
  try {
    const { members_name, members_surname, members_email, members_pass } =
      req.body;

    // Check if the email is already registered
    const existingMember = await Member.findOne({ members_email });
    if (existingMember) {
      return res.status(400).json({ message: "Bu email zaten kullanılıyor." });
    }

    // Create a new user
    const newMember = new Member({
      members_name,
      members_surname,
      members_email,
      members_pass,
    });

    // Generate and store the verification token
    newMember.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newMember.save();

    // Send verification email to user
    sendVerificationEmail(newMember.members_email, newMember.verificationToken);
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Kayıt Yapılamadı!" });
  }
});

// Endpoint to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user witht the given verification token
    const member = await Member.findOne({ verificationToken: token });
    if (!member) {
      return res.status(404).json({ message: "Geçersiz doğrulama kodu." });
    }

    //Mark the user as verified
    member.verified = true;
    member.verificationToken = undefined;

    await member.save();

    res.status(200).json({ message: "Email başarıyla doğrulandı." });
  } catch (error) {
    res.status(500).json({ message: "Email doğrulaması gerçekleştirilemedi." });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

// Endpoint to login
app.post("/login", async (req, res) => {
  try {
    const { members_email, members_pass } = req.body;
    console.log("Received login request for:", members_email);

    // Hash the received password before comparison
    const hashedPassword = bcrypt.hashSync(members_pass, 10);

    // Set up headers with the Bearer token for the API request
    const apiHeaders = {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyI4MjUyYjVkNjIzOTUwODQ4NmM5MjM3N2I3MGZiZjRlZmFkbV9sb2dnZWQiOnRydWUsIjgyNTJiNWQ2MjM5NTA4NDg2YzkyMzc3YjcwZmJmNGVmYWRtX3VzZXJpZCI6IjYiLCI4MjUyYjVkNjIzOTUwODQ4NmM5MjM3N2I3MGZiZjRlZmFkbV91c2VybmFtZSI6ImFwaV91c2VyIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fdXNlcmdyb3VwaWQiOiIzIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fdXNlcmlzYWRtaW4iOiIxIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9saXN0IjoiKiIsIjgyNTJiNWQ2MjM5NTA4NDg2YzkyMzc3YjcwZmJmNGVmYWRtX2F1dGhfYWRkIjoiKiIsIjgyNTJiNWQ2MjM5NTA4NDg2YzkyMzc3YjcwZmJmNGVmYWRtX2F1dGhfZWRpdCI6IioiLCI4MjUyYjVkNjIzOTUwODQ4NmM5MjM3N2I3MGZiZjRlZmFkbV9hdXRoX3ZpZXciOiIqIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9kZWwiOiIqIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9kZXRhaWwiOiIqIiwiODI1MmI1ZDYyMzk1MDg0ODZjOTIzNzdiNzBmYmY0ZWZhZG1fYXV0aF9yZXBvcnQiOiIqIn0.jfLXQsL0_fu9iJA6pP4FuVSvU61P3NYWS4ueMsrllms",
      "Content-Type": "application/json",
    };

    // Make a request to the external API for user verification
    const apiResponse = await axios.get(
      "http://apitest.dogusyapimarket.com.tr/api/v2/members?pagination[perpage]=1000",
      { headers: apiHeaders }
    );

    // Assuming the actual user data is nested under 'data' property
    const responseData = apiResponse.data.data;

    // Find the user with the provided email
    const foundUser = responseData.find(
      (user) => user.members_email === members_email
    );

    console.log("Password comparison result:", bcrypt.compareSync(members_pass, foundUser.members_pass));

    if (
      foundUser &&
      bcrypt.compareSync(members_pass, foundUser.members_pass)
    ) {
      // Should send additional user information in the token payload
      const tokenPayload = { members_email: foundUser.members_email };
      const authToken = jwt.sign({ data: tokenPayload }, secretKey);
      console.log("Generated authToken:", authToken);
      // Send a success response with the token
      res.status(200).json({ success: true, authToken });
    } else {
      console.log("Login failed for:", members_email, members_pass);
      // If login fails, send an appropriate response
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    // Handle other errors
    console.error("Error during login:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//  Endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { memberId, address } = req.body;

    //find the user by the Userid
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    //add the new address to the user's addresses array
    member.addresses.push(address);

    //save the updated user in te backend
    await member.save();

    res.status(200).json({ message: "Adres başarıyla oluşturuldu" });
  } catch (error) {
    res.status(500).json({ message: "Adres eklenemedi" });
  }
});

// Endpoint to get all the addresses of a particular user
app.get("/addresses/:memberId", async (req, res) => {
  try {
    const memberId = req.params.memberId;

    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const addresses = member.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Adresler yüklenirken bir hata oluştu" });
  }
});

// Endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const { memberId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Create an array of product objects from the cartItems
    const products = cartItems.map((item) => ({
      name: item?.products_name,
      quantity: item.quantity,
      price: item.products_price,
      image: item?.products_picture,
    }));

    // Create a new order
    const order = new Order({
      member: memberId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Siparişiniz başarıyla oluşturuldu!" });
  } catch (error) {
    console.log("Sipariş oluşturulurken hata meydana geldi.", error);
    res
      .status(500)
      .json({ message: "Sipariş oluşturulurken hata meydana geldi." });
  }
});

// Get the user profile
app.get("/profile/:memberId", async (req, res) => {
  try {
    const memberId = req.params.memberId();

    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    }

    res.status(200).json({ member });
  } catch (error) {
    res.status(500).json({ message: "Profil görüntülemede bir sorun oluştu" });
  }
});

app.get("/orders/:memberId", async (req, res) => {
  try {
    const memberId = req.params.memberId;

    const orders = await Order.find({ member: memberId }).populate("member");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Siparişiniz bulunmuyor" });
    }

    res.status(200).json({ orders });
  } catch {
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

app.listen(port, () => {
  console.log("Server is running on port 8000");
});
