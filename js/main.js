const checkAnswers = (formId) => {

    const form = document.getElementById(formId);
    const questions = form.querySelectorAll('.question');
    const selectedAnswers = form.querySelectorAll('input[type="radio"]:checked');
    const warningAlert = document.getElementById('warning-alert');
    const result = document.getElementById('result')

    if (selectedAnswers.length < questions.length) {
        warningAlert.classList.remove('d-none');
        result.classList.add('d-none')
        return;
    }
    
    warningAlert.classList.add('d-none');
    result.classList.remove('d-none');

    let rightAnswers = 0;

    selectedAnswers.forEach((answer) => {
        if (answer.value === 'right') {
            rightAnswers++;
        }
    });

    const resultElement = document.getElementById('result');
    resultElement.textContent = `Правильных ответов: ${rightAnswers} из ${selectedAnswers.length}`;

    form.reset();

}