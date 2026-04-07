
// const express = require('express');
// const router = express.Router();
// const auth = require('../../middleware/auth');
// const Warranty = require('../../models/Warranty');

// // @route   POST api/warranties
// // @desc    Add a new warranty
// // @access  Private
// router.post('/', auth, async (req, res) => {
//     const { productName, storeName, purchaseDate, expiryDate, category, purchasePrice, serialNumber, description, notes } = req.body;

//     try {
//         const newWarranty = new Warranty({
//             user: req.user.id,
//             productName,
//             storeName,
//             purchaseDate,
//             expiryDate,
//             category,
//             purchasePrice,
//             serialNumber,
//             description,
//             notes,
//         });

//         const warranty = await newWarranty.save();
//         res.json(warranty);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // @route   GET api/warranties
// // @desc    Get all user warranties
// // @access  Private
// router.get('/', auth, async (req, res) => {
//     try {
//         const warranties = await Warranty.find({ user: req.user.id }).sort({ expiryDate: 1 });
//         res.json(warranties);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // @route   GET api/warranties/:id
// // @desc    Get warranty by ID
// // @access  Private
// router.get('/:id', auth, async (req, res) => {
//     try {
//         const warranty = await Warranty.findById(req.params.id);

//         if (!warranty) {
//             return res.status(404).json({ msg: 'Warranty not found' });
//         }

//         // Make sure user owns the warranty
//         if (warranty.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'User not authorized' });
//         }

//         res.json(warranty);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // @route   PUT api/warranties/:id
// // @desc    Update a warranty
// // @access  Private
// router.put('/:id', auth, async (req, res) => {
//     const { productName, storeName, purchaseDate, expiryDate, category, purchasePrice, serialNumber, description, notes } = req.body;

//     // Build warranty object
//     const warrantyFields = {};
//     if (productName) warrantyFields.productName = productName;
//     if (storeName) warrantyFields.storeName = storeName;
//     if (purchaseDate) warrantyFields.purchaseDate = purchaseDate;
//     if (expiryDate) warrantyFields.expiryDate = expiryDate;
//     if (category) warrantyFields.category = category;
//     if (purchasePrice) warrantyFields.purchasePrice = purchasePrice;
//     if (serialNumber) warrantyFields.serialNumber = serialNumber;
//     if (description) warrantyFields.description = description;
//     if (notes) warrantyFields.notes = notes;

//     try {
//         let warranty = await Warranty.findById(req.params.id);

//         if (!warranty) return res.status(404).json({ msg: 'Warranty not found' });

//         // Make sure user owns the warranty
//         if (warranty.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'User not authorized' });
//         }

//         warranty = await Warranty.findByIdAndUpdate(
//             req.params.id,
//             { $set: warrantyFields },
//             { new: true }
//         );
//         res.json(warranty);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// // @route   DELETE api/warranties/:id
// // @desc    Delete a warranty
// // @access  Private
// router.delete('/:id', auth, async (req, res) => {
//     try {
//         const warranty = await Warranty.findById(req.params.id);

//         if (!warranty) {
//             return res.status(404).json({ msg: 'Warranty not found' });
//         }

//         // Make sure user owns the warranty
//         if (warranty.user.toString() !== req.user.id) {
//             return res.status(401).json({ msg: 'User not authorized' });
//         }

//         await Warranty.findByIdAndDelete(req.params.id);

//         res.json({ msg: 'Warranty removed' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Warranty = require('../../models/Warranty');
const User = require('../../models/User');
const transporter = require('../../config/email');
// @route   POST api/warranties
// @desc    Add a new warranty
// @access  Private
// router.post('/', auth, async (req, res) => {
//     const {
//         productName,
//         storeName,
//         purchaseDate,
//         expiryDate,
//         category,
//         purchasePrice,
//         serialNumber,
//         description,
//         notes,
//         imageUrl
//     } = req.body;

//     try {
//         const newWarranty = new Warranty({
//             user: req.user.id,
//             productName,
//             storeName,
//             purchaseDate,
//             expiryDate,
//             category,
//             purchasePrice,
//             serialNumber,
//             description,
//             notes,
//             imageUrl,
//         });

//         const warranty = await newWarranty.save();
//         res.json(warranty);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// });

router.post('/', auth, async (req, res) => {
    const {
        productName,
        storeName,
        purchaseDate,
        expiryDate,
        category,
        purchasePrice,
        serialNumber,
        description,
        notes,
        imageUrl
    } = req.body;

    try {
        const newWarranty = new Warranty({
            user: req.user.id,
            productName,
            storeName,
            purchaseDate,
            expiryDate,
            category,
            purchasePrice,
            serialNumber,
            description,
            notes,
            imageUrl,
        });

        const warranty = await newWarranty.save();

        const user = await User.findById(req.user.id);

        if (user) {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: user.email,
                    subject: 'Warranty Added Successfully',
                    html: `
                        <h2>Warranty Added</h2>
                        <p>Your warranty for <b>${productName}</b> has been added successfully.</p>
                        <p><b>Store:</b> ${storeName || 'N/A'}</p>
                        <p><b>Expiry Date:</b> ${expiryDate}</p>
                    `,
                });
                console.log('Warranty email sent');
            } catch (mailErr) {
                console.error('Warranty email error:', mailErr.message);
            }
        }

        res.json(warranty);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route   GET api/warranties
// @desc    Get all user warranties
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const warranties = await Warranty.find({ user: req.user.id }).sort({ expiryDate: 1 });
        res.json(warranties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/warranties/:id
// @desc    Get warranty by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const warranty = await Warranty.findById(req.params.id);

        if (!warranty) {
            return res.status(404).json({ msg: 'Warranty not found' });
        }

        // Make sure user owns the warranty
        if (warranty.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        res.json(warranty);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/warranties/:id
// @desc    Update a warranty
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const {
        productName,
        storeName,
        purchaseDate,
        expiryDate,
        category,
        purchasePrice,
        serialNumber,
        description,
        notes,
        imageUrl
    } = req.body;

    // Build warranty object
    const warrantyFields = {};
    if (productName) warrantyFields.productName = productName;
    if (storeName) warrantyFields.storeName = storeName;
    if (purchaseDate) warrantyFields.purchaseDate = purchaseDate;
    if (expiryDate) warrantyFields.expiryDate = expiryDate;
    if (category) warrantyFields.category = category;
    if (purchasePrice) warrantyFields.purchasePrice = purchasePrice;
    if (serialNumber) warrantyFields.serialNumber = serialNumber;
    if (description) warrantyFields.description = description;
    if (notes) warrantyFields.notes = notes;
    if (imageUrl) warrantyFields.imageUrl = imageUrl;

    try {
        let warranty = await Warranty.findById(req.params.id);

        if (!warranty) return res.status(404).json({ msg: 'Warranty not found' });

        // Make sure user owns the warranty
        if (warranty.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        warranty = await Warranty.findByIdAndUpdate(
            req.params.id,
            { $set: warrantyFields },
            { new: true }
        );

        res.json(warranty);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/warranties/:id
// @desc    Delete a warranty
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const warranty = await Warranty.findById(req.params.id);

        if (!warranty) {
            return res.status(404).json({ msg: 'Warranty not found' });
        }

        // Make sure user owns the warranty
        if (warranty.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Warranty.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Warranty removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;