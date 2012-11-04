/**
 * Created with JetBrains PhpStorm.
 * User: verber
 * Date: 03.11.12
 * Time: 1:38
 * To change this template use File | Settings | File Templates.
 */
var rowTemplate;
$(document).ready(
    function(){
        function drawTable(response)
        {
            $('table.table tbody').empty();
            if (response.success) {
                for (i in response.data) {
                    var tmp = null;
                    tmp = '<tr><td data-role="key">{{key}}</td><td data-role="value">{{name}}:{{message}}</td></tr>';
                    tmp = tmp.replace('{{key}}', response.data[i].key);
                    tmp = tmp.replace('{{name}}', response.data[i].value.name);
                    tmp = tmp.replace('{{message}}', response.data[i].value.message);
                    $('table.table tbody').append(tmp);
                }
            } else {
                $('table.table tbody').text(response.message);
            }
        }

        $.getJSON('getItems.php', drawTable);

        $('button.btn').click(function(){
            $.post(
                'post.php',
                {
                    'name': $("input[name='name']").val(),
                    'message': $("textarea[name='message']").val()
                },
                drawTable,
                'json'
            );
            $("input[name='name']").val('');
            $("textarea[name='message']").val('');
            return false;
        });
    }
);
