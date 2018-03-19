// Listen for submit
    document.getElementById('loan-form').addEventListener('submit', function(e) {
        // Hode Results
        document.getElementById('results').style.display = 'none';

        // Show Loader
        document.getElementById('loading').style.display = 'block';

        // Set timeout and calculate result after 2 seconds
        setTimeout(calculateResult, 2000);
        e.preventDefault()
    });

// Calculate Result Function
    function calculateResult() {
    // Prevent form default behaviour

    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // Calculations
        // Create Principal Formula
        const principal = parseFloat(amount.value);
        // Calculated Interest Formula
        const calculatedInterest = parseFloat(interest.value / 100 / 12);
        // Calculated Payment Formula
        const calculatedPayments = parseFloat(years.value * 12);

    // Calculate Monthly Payments
        // Create a formula 
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        // variable for monthly operations
        const monthly = (principal * x * calculatedInterest) / (x - 1);

        // check if the values are finite with the isFinite() method and call the toFixed(2) method on them
        if (isFinite(monthly)) {
            // for monthly payments value
            monthlyPayment.value = monthly.toFixed(2);
            // total payments value
            totalPayment.value = (monthly * calculatedPayments).toFixed(2);
            // total interest value
            totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2); 

            // Show Results
            document.getElementById('results').style.display = 'block';

            // Hide Loader
            document.getElementById('loading').style.display = 'none';

        } else {
            showError('Please check your numbers');
        }    
    
}

// Function to show error
function showError(error) {
    // Hide Results
    document.getElementById('results').style.display = 'none';

    // Hide Loader
    document.getElementById('loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Get Element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add a class
    errorDiv.className = 'alert alert-danger';
    // Create textNode and append to div
    errorDiv.appendChild(document.createTextNode(error));
    // Insert error above heading
    card.insertBefore(errorDiv, heading);
    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear error function
function clearError() {
    document.querySelector('.alert').remove();
}