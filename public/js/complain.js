const submitBt = document.getElementById('submitBtn');
const complaint_form = document.getElementById('complaint_form');

const getInfo = async (event) => {
    event.preventDefault(); // Prevents default form submission

    const email = document.getElementById('email').value;
    const complaint = document.getElementById('complaint').value;
    console.log(email)
    console.log(complaint)

    if (!email || !complaint) {
        document.getElementById('textCon').textContent = 'All fields are required.';
        return;
    }

    try {
        const response = await fetch('/contactUs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, complaint }),
        });
        console.log(response);

        if (response.ok) {
            console.log('Form submitted successfully');
            const data = await response.json();
            document.getElementById('textCon').textContent = data.message;
            complaint_form.reset();
        } else {
            console.error('Server error:');
            const errorData = await response.json();
            document.getElementById('textCon').textContent = errorData.message || 'An error occurred. Please try again.';
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        document.getElementById('textCon').textContent = 'An error occurred. Please try again.';
    }
};

submitBt.addEventListener('click', getInfo);
