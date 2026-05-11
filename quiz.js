
const totalQuestions = 9;

function showQuestion(n) {
    document.querySelectorAll('.windows').forEach(block => {
        block.classList.remove('active');
    });

    const target = document.getElementById(`question-${n}`);
    if (target) target.classList.add('active');

    const header = document.querySelector(`#question-${n} h2`);
    if (header) header.textContent = `Вопрос ${n} из ${totalQuestions}`;
}

function saveCurrentAnswer(questionNumber) {
    const block = document.getElementById(`question-${questionNumber}`);
    if (!block) return false;

    const checkedRadio = block.querySelector('input[type="radio"]:checked');
    if (checkedRadio) {
        localStorage.setItem(`answer_${questionNumber}`, checkedRadio.value);
        return true;
    }
    return false;
}

function saveAllAnswers() {
    const answers = {};
    for (let i = 1; i <= totalQuestions; i++) {
        const value = localStorage.getItem(`answer_${i}`);
        if (value) {
            answers[`q${i}`] = value;
        }
    }
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    console.log('Сохранено в localStorage:', answers); // для отладки
    return answers;
}


document.addEventListener('DOMContentLoaded', () => {
    
    showQuestion(1);

    document.querySelectorAll('.go').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentBlock = btn.closest('.windows');
            if (!currentBlock) return;

            const qNumber = parseInt(currentBlock.id.split('-')[1]);

            if (!saveCurrentAnswer(qNumber)) {
                alert('Пожалуйста, выберите вариант ответа');
                return;
            }

            if (qNumber === totalQuestions) {
                saveAllAnswers();                   
                setTimeout(() => {                 
                    window.location.href = 'result.html';
                }, 100);
            } else {
                showQuestion(qNumber + 1);
            }
        });
    });

    document.querySelectorAll('.nazad').forEach(btn => {
        btn.addEventListener('click', () => {
            const currentBlock = btn.closest('.windows');
            if (!currentBlock) return;
            const qNumber = parseInt(currentBlock.id.split('-')[1]);
            if (qNumber > 1) showQuestion(qNumber - 1);
        });
    });

    for (let i = 1; i <= totalQuestions; i++) {
        const saved = localStorage.getItem(`answer_${i}`);
        if (saved) {
            const radio = document.querySelector(`#question-${i} input[value="${saved}"]`);
            if (radio) radio.checked = true;
        }
    }
});
