const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://ozanboran:ozan@cluster0.mdl1r3k.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");

// Function to send verification email to the user
const sendVerificationEmail = async (email, verificationToken) => {
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
    to: email,
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
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email zaten kullanılıyor." });
    }

    // Create a new user
    const newUser = new User({ name, email, password });

    // Generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // Save the user to the database
    await newUser.save();

    // Send verification email to user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
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
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Geçersiz doğrulama kodu." });
    }

    //Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

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

// Endpoint to login the user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email veya şifre hatalı." });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Hatali şifre" });
    }

    // Generate a token
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Giriş yapılamadı." });
  }
});

//  Endpoint to store a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Adres başarıyla oluşturuldu" });
  } catch (error) {
    res.status(500).json({ message: "Adres eklenemedi" });
  }
});

// Endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Adresler yüklenirken bir hata oluştu" });
  }
});

// Endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Create an array of product objects from the cartItems
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    // Create a new order
    const order = new Order({
      user: userId,
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
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı Bulunamadı" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Profil görüntülemede bir sorun oluştu" });
  }
});

app.get("/orders/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId }).populate("user");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "Siparişiniz bulunmuyor" });
    }

    res.status(200).json({ orders });
  } catch {
    res.status(500).json({ message: "Sunucu hatası" });
  }
});
