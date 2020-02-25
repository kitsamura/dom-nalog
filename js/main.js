$(document).ready(function () {




    let tariffs = {
        light: {
            text: 'Вы выбрали тариф «Налоговая поддержка Лайт» стоимостью 2900 рублей.',
            id: '2318',
        },
        standart: {
            text: 'Вы выбрали тариф «Налоговая поддержка» стоимостью 3900 рублей.',
            id: '2323',
        },
        vip: {
            text: 'Вы выбрали тариф «Налоговая поддержка ВИП» стоимостью 7000 рублей.',
            id: '2328',
        },

    };


    $('.buying').click(function () {
        $('.blur').css('filter', 'blur(10px)');
        $('#sale_form').css('display', 'block');

        let tariffName = $(this).data('tariff');
        $('#form_text').text(tariffs[tariffName].text);
        $('#sale_id').val(tariffs[tariffName].id);

        initToken();
    });




    $('.close_light').click(function () {
        $('.blur').css('filter', 'none');
        $('#sale_form').css('display', 'none');
    });

    // $(document).keydown(function(eventObject){
    //     if (eventObject.which == 27)
    //     $('.blur').css('filter', 'none');
    //     $('#sale_form').css('display', 'none');
    // });


    $('.when__more').click(function () {
        $('.inactive').css('display', 'block');
        $('.when__more').css('display', 'none');
    });

    function getTariffs() {
        let tariffs = [];
        $('#selector option').each((key, val) => {
            tariffs.push(val.value)
        });
        return tariffs;
    }

    function changeTariff(tariff_type, tariffs) {

        tariffs.forEach(tariff => {
            $('.tariff_' + tariff).hide();
            if (tariff_type == tariff) {
                $('.tariff_' + tariff).show();
            }
        })
    }

    function initToken() {
        $("#buy_form").each(function (element) {
            let rate_id = $('#buy_form #sale_id').val();
            console.log(rate_id);
            $.post('ExternalSale.php?a=init&rate_id=' + rate_id + '', function (data) {
                let d = JSON.parse(data);
                $('#sale_key').val(d.token);
            })

        })
    }

    $('.tariff_light').show()

    $('#selector').change(() => {
        var tariff_type = $('#selector option:selected').val();
        let tariffs = getTariffs();
        changeTariff(tariff_type, tariffs);
    });

    $(".scrollTo").click(function () {
        var elementClick = $(this).attr("href");
        var destination = ($(elementClick).offset().top - 90);
        $('html,body').animate({
            scrollTop: destination
        }, 1000);
    });

    $("#phone").mask("8(999) 999-9999");

    $('.checkbox').change(function () {
        if ($(this).is(":checked")) {
            $('.checkbox-custom span').css('border-color', '#adadad')
        } else {
            $('.checkbox-custom span').css('border-color', 'rgb(237, 29, 37)')
        }
    })

    $('input[name="sale[lastname]"], input[name="sale[name]"], input[name="sale[surname]"]').on('blur', function () {
        $(this).val($(this).val().replace(/[^А-Яа-я\-\s]/g, ''))
    });

    $(document).on('keyup', '.input__email', function () {
        let email = $(this).val();
        if (email.length > 0 &&
            (email.match(/[-0-9A-Za-z\.]+?\@[a-z]+\.[a-z]/) || []).length !== 1) {
            $(this).css("box-shadow", "0 0 2px 0 #ed1d25");
        } else {
            $(this).css("box-shadow", "none");
        }
    });

    $('.checkbox').change(function () {
        if ($(this).is(":checked")) {
            $(this).css('border', '1px solid #adadad');
        } else {
            $(this).css('border', '1px solid #ed1d25');
        }
    });

    $('#lastname, #firstname, #patronymic').keyup(function (e) {
        let regExp = /[а-яёА-ЯЁ]+/g;
        let str = $(this).val();

        if ((!regExp.test(str)) && (str.length > 0)) {
            e.preventDefault();
            $(this).parent().addClass('kyrillic')
        } else {
            $(this).parent().removeClass('kyrillic')
        }

    });

    $('#accept').click(function () {

        if (($('[name="sale[lastname]"]').val().length > 0) && ($('[name="sale[mobile]"]').val().length > 1) &&
            ($('[name="sale[name]"]').val().length > 0) && ($('[name="sale[surname]"]').val().length > 0) && ($('[name="sale[email]"]').val().length > 0) &&
            ($('.checkbox').is(':checked'))) {

            $('form').submit();

        } else {
            if (!$('.checkbox').is(':checked')) {
                $('.checkbox-custom').css('border-color', 'rgb(237, 29, 37)')
            } else {
                $('.checkbox-custom').css('border-color', '#adadad')
            }
            $('form .input_required').each(function () {
                if ($(this).val().length > 0) {
                    $(this).css('border', '1px solid #adadad')
                } else {
                    $(this).css('border', '1px solid rgb(237, 29, 37)')
                }
            })
        }

    })


    $('#sale_form').change(function () {
        if (($('[name="sale[lastname]"]').val().length > 0) && ($('[name="sale[mobile]"]').val().length > 1) &&
            ($('[name="sale[name]"]').val().length > 0) && ($('[name="sale[surname]"]').val().length > 0) && ($('[name="sale[email]"]').val().length > 0) &&
            ($('.checkbox').is(':checked'))) {
            $('.button_buy').css('background', 'rgba(122, 172, 56)');
        } else {
            $('.button_buy').css('background', '#b4b4b4')
        }

    })
});



document.addEventListener('keypress', function (e) {
    if (e.keyCode === 27) document.getElementById('sale_form').hidden = 1;
});