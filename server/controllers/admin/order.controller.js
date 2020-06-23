const mongoose = require('mongoose');
const Order = require("../../models/order.model");

function index(req, res, next) {
    Order.find({}).then(resp => {
        res.json({ status: true, data: resp, error: null });
    }).catch(err => {
        next(err);
    });
}

function show(req, res, next) {
    Order.findById(req.params.orderId)
        .then(resp => {
            res.json({ status: true, data: resp, error: null });
        })
        .catch(error => {
            next(err);
        });
}

function confirm(req, res, next) {
    Order.updateOne(
        { _id: mongoose.Types.ObjectId(req.params.orderId) },
        { $set: { status: process.env.STATUS_SUCCESS } })
        .exec()
        .then(resp => {
            res.json({ status: true, error: null });
        }).catch(err => {
        next(err);
    });
}

function destroy(req, res, next) {
    Order.findByIdAndDelete(req.params.orderId)
        .then(resp => {
            if (!!resp) {
                res.json({ status: true, error: null });
            } else {
                res.json({ status: false, error: resp });
            }
        }).catch(err => {
            next(err);
        })
}

module.exports = {
    index,
    show,
    confirm,
    destroy
}
