function validation() {
    let input = $('.validate-input .input100');

    function validate(input) {
        console.log(input);
        if ($(input).attr('name') == 'student-id') {
            let length = $(input).val().trim().toString().length;
            console.log(length);
            if (length >= 5 && length <= 6) {
                return true;
            }
            return false;
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        let thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        let thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    return {
        wrapper: function () {
            let check = true;

            $('.validate-form .input100').each(function () {
                $(this).focus(function () {
                    hideValidate(this);
                });
            });

            for (let i = 0; i < input.length; i++) {
                if (validate(input[i]) == false) {
                    showValidate(input[i]);
                    check = false;
                }
            }

            return check;
        }
    }
}

function submit() {


    if (validation().wrapper()) {

        // Form Submission
        let hostUrl = 'http://139.162.53.145:3000/survey/';
        let form = $('.contact100-form');
        let name = document.getElementById("student-name").value;

        let studentId = document.getElementById("student-id").value;
        let url = `${hostUrl}${studentId}/expectation`;
        fetch(url, {
                method: form.attr('method'),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                mode: "cors",
                body: JSON.stringify({
                    "studentname": name,
                    "expectation": document.getElementById("expectation").value
                })
            })
            .then(
                Swal.fire({
                    type: "success",
                    title: `谢谢你${name}，提交已成功，恭喜你有机会获奖！`,
                    animation: true,
                    customClass: {
                        popup: 'animated tada'
                    }
                })

            )
    }
}