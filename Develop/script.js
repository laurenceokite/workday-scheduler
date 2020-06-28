var timeBlockArray = [
    {
        time: '9',

        description: ''
    },
    {
        time: '10',

        description: ''
    },
    {
        time: '11',

        description: ''
    },
    {
        time: '12',

        description: ''
    },
    {
        time: '13',

        description: ''
    },
    {
        time: '14',

        description: ''
    },
    {
        time: '15',

        description: ''
    },
    {
        time: '16',

        description: ''
    },
    
]

//Display date in header
var printDate = function() {
    var currentDate = moment().format('dddd, MMMM Do');
    $('#currentDay').text(currentDate);
};

//color code timeblocks
var colorCode = function() {
    $(timeBlockArray).each(function() {
        var current = parseInt(moment().format('HH'));
        var time = parseInt($(this).attr('time'));
        var timeBlockEl = $('#' + time);
        if (time < current) {
            timeBlockEl.addClass('past');
        }
        else if (time === current) {
            timeBlockEl.addClass('present');
        }
        else {
            timeBlockEl.addClass('future');
        }
    })
};

//load localStorage
var load = function() {
    var storedItems = JSON.parse(localStorage.getItem('tasks'));
    if (!storedItems) {
        console.log('local storage is empty')
        return false
    }
    timeBlockArray = storedItems;
    $(timeBlockArray).each(function() {
        var time = parseInt($(this).attr('time'));
        var text = $(this).attr('description');
        var timeBlockEl = $('#' + time);
        timeBlockEl.text(text);
    });
};

//click to open a textarea
$('.container').on('click', '.description', function() {
    var text = $(this).text().trim();
    var textInput = $('<textarea>')
        .addClass('col-10 textarea')
        .val(text);
    var current = parseInt(moment().format('HH'));
    var time = parseInt($(this).attr('id'));
    textInput.attr('id', time);
    if (time < current) {
        textInput.addClass('past');
    }
    else if (time === current) {
        textInput.addClass('present');
    }
    else {
        textInput.addClass('future');
    }
    $(this).replaceWith(textInput);
    textInput.trigger('focus');

});

$('.container').on('blur', 'textarea', function() {
    var text = $(this).val().trim();
    var newDescription = $('<div>')
        .addClass('col-10 description')
        .text(text);
    var current = parseInt(moment().format('HH'));
    var time = parseInt($(this).attr('id'));
    newDescription.attr('id', time);
    if (time < current) {
        newDescription.addClass('past');
    }
    else if (time === current) {
        newDescription.addClass('present');
    }
    else {
        newDescription.addClass('future');
    }
    $(this).replaceWith(newDescription)
});

//save description to array
$('.container').on('click', '.saveBtn', function() {
    var id = $(this).siblings('.description').attr('id');
    var text = $(this).siblings('.description').text();
    $(timeBlockArray).each(function() {
        var time = $(this)[0].time;
        if (id === time) {
            $(this)[0].description = text;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(timeBlockArray));
});

load();
colorCode();
printDate();