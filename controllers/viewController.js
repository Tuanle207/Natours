const Tour = require('./../models/tourModel');
const catchAsync = require('./../ultils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
    // Get all tours data from collection
    const tours = await Tour.find();

    // Build a template

    // Render that template using tour data from step 1
    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    });
});

exports.getTour = catchAsync(async (req, res, next) => {
    // Get tour data from collection
    const tour = await Tour.findOne({ slug: req.params.name }).populate({
        path: 'reviews',
        fields: 'review rating user'
    });
    // Build the template

    // Render the template
    res.status(200).render('tour', {
        title: tour.name,
        tour
    });
});

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Login'
    });
};
