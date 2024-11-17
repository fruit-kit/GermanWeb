const checkAnswers = (formId) => {
    const form = document.getElementById(formId);
    const questions = form.querySelectorAll('.question');
    const selectedAnswers = form.querySelectorAll('input[type="radio"]:checked');
    const warningAlert = document.getElementById('warning-alert');
    const result = document.getElementById('result');

    if (selectedAnswers.length < questions.length) {
        warningAlert.classList.remove('d-none');
        result.classList.add('d-none');
        return;
    }

    warningAlert.classList.add('d-none');
    result.classList.remove('d-none');

    let rightAnswers = 0;

    questions.forEach((question) => {
        const labels = question.querySelectorAll('label');
        labels.forEach((label) => {
            label.innerHTML = label.innerHTML.replace('✅', '').replace('❌', '');
        });
    });

    selectedAnswers.forEach((answer) => {
        const question = answer.closest('.question');
        const labels = question.querySelectorAll('label');

        // Найдем правильный ответ
        labels.forEach((label) => {
            if (label.getAttribute('for') === answer.id) {
                if (answer.value === 'right') {
                    label.innerHTML += ' ✅';
                    rightAnswers++;
                } else {
                    label.innerHTML += ' ❌';
                }
            }

            const correctAnswer = question.querySelector('input[value="right"]');
            const correctLabel = question.querySelector(`label[for="${correctAnswer.id}"]`);
            if (correctLabel && !correctLabel.innerHTML.includes('✅')) {
                correctLabel.innerHTML += ' ✅';
            }
        });
    });

    const resultElement = document.getElementById('result');
    const rightAnswersInPercent = (rightAnswers / questions.length) * 100;
    resultElement.textContent = `Правильних відповідей: ${rightAnswersInPercent.toFixed(0)}%`;

    const allRadios = form.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.disabled = true;
    });
}

const resetAnswers = (formId) => {
    const form = document.getElementById(formId);

    form.reset();

    const questions = form.querySelectorAll('.question');
    questions.forEach((question) => {
        const labels = question.querySelectorAll('label');
        labels.forEach((label) => {
            label.innerHTML = label.innerHTML.replace('✅', '').replace('❌', '');
        });
    });

    const warningAlert = document.getElementById('warning-alert');
    const result = document.getElementById('result');
    warningAlert.classList.add('d-none');
    result.classList.add('d-none');

    const allRadios = form.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.disabled = false;
    });
}