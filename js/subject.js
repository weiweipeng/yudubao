//题目通用方法


//选项
var optionDic = { 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J', 10: 'K' };

//输入框自动增长
function autoLength() {
    $('.inputText').keydown(function () {
        var txtlen = this.value.length;
        txtlen = txtlen + 4;
        if (txtlen * 12 > 100) {
            $(this).css('width', txtlen * 12 + 'px');
        } else {
            $(this).css('width', '100px');
        }
    });

    $('.inputText').focus(function () {
        var txtlen = this.value.length;
        txtlen = txtlen + 4;
        if (txtlen * 12 > 100) {
            $(this).css('width', txtlen * 12 + 'px');
        } else {
            $(this).css('width', '100px');
        }
    });
}

//篇章拼接
function SubjectString(subject) {
    var str = '';
    str += '<form id = "form1" autocomplete="off" style=" overflow:auto;padding:0 10px;" ><div id="' + subject.Id + '">';
    str += '<p class="specialFontTitle" >话题：' + subject.Topic + '&nbsp|&nbsp文体：' + subject.LiteraryForm + '&nbsp|&nbsp';
    str += '题型：' + subject.QuestionsType + '&nbsp|&nbsp难度：' + subject.Difficulty + '&nbsp|&nbsp;';
    str += '词数：' + subject.Words + '&nbsp|&nbsp分数：' + subject.Score + '</p>';
    str += '<h3 style="margin-top: 20px;">' + subject.Name + '</h3><br/>';
    str += '<p class="specialFont" >文章导读：' + subject.WenZhangDaoDu + '</p><br/>';
    str += '<p class="specialFont" >词语指津：' + subject.CiYuZhiJin + '</p><br/>';
    switch (subject.QuestionsType) {
        case '阅读判断':
            str += subject.Title + '<hr>';
            $.each(subject.QuestionItem, function (ind, val) {
                str += '<div id="' + val.Id + '" class="Readingjudgment"> ';
                str += '<p>' + val.Sort + ' . ' + val.Title + '</p>';
                str += '<div class="fr"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="F" />×</div>';
                str += '<div class="fr"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="T" />√</div></div>';
            });
            break;
        case '图片选择':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += val.Sort + '. ' + queArray[0] + '<br/>';
                for (var i = 1; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                    str += queArray[i] + '</div>';
                }
                str += '<br/>';
            });
            break;
        case '阅读选择':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += val.Sort + '. ' + queArray[0] + '<br/>';
                for (var i = 1; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                    str += queArray[i] + '</div><br/>';
                }
                str += '<br/>';
            });
            break;
        case '完形填空':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += '<div id="' + val.Id + '" class="wanxingtiankognQue">' + val.Sort + '.&nbsp';
                for (var i = 0; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                    str += queArray[i] + '</div>';
                }
                str += '</div>';
            });
            break;
        case '语法词汇填空':
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content + '<hr/>';
            break;
        case '选词填空':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            str += '<tr>';
            for (var i = 0; i < xuanxiang.length; i++) {
                if ((i + 1) % 5 == 0 && i != 0) {
                    str += '<td>' + xuanxiang[i] + '</td></tr><tr>';
                } else {
                    str += '<td>' + xuanxiang[i] + '</td>';
                }
            }
            str += '</tr>';
            str += ' </table>';
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText  ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content;
            break;
        case '表格填空':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += '<div id="' + val.Id + '" class="wanxingtiankognQue">' + val.Sort + '.&nbsp';
                for (var i = 0; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                    str += queArray[i] + '</div>';
                }
                str += '</div>';
            });
            break;
        case '选句填空':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content;
            break;
        case '段落标题匹配':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content;
            break;
        case '阅读填空':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';
            });
            break;
        case '回答问题':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';
            });
            break;
        case '综合阅读':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';
            });
            break;
        case '选词填空-所给词的适当形式填空':
            str += '<p style="text-align:center" ><span style="border:1px solid;padding:5px">' + subject.WordSentence + '</span></p>';
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content;
            break;
        case '给首字母完形填空':
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content + '<hr/>';
            break;
        case '信息匹配':
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content + '<hr/>';
            break;
        default:;
    }
    str += '</div>';
    if (subject.WritingSkillId != "") {
        str += WritingSkillString(subject.WritingSkill);
    }
    str == '</form>';
    return str;
}


//教师篇章拼接
function TeacherSubjectString(subject) {
    console.log(subject);
    var str = '';
    str += '<form id = "form1" autocomplete="off" style=" overflow:auto;padding:0 10px;" ><div id="' + subject.Id + '">';
    str += '<p class="specialFontTitle" >话题：' + subject.Topic + '&nbsp|&nbsp文体：' + subject.LiteraryForm + '&nbsp|&nbsp';
    str += '题型：' + subject.QuestionsType + '&nbsp|&nbsp难度：' + subject.Difficulty + '&nbsp|&nbsp;';
    str += '词数：' + subject.Words + '&nbsp|&nbsp分数：' + subject.Score + '</p>';
    str += '<h3 style="margin-top: 20px;">' + subject.Name + '</h3><br/>';
    str += '<p class="specialFont" >文章导读：' + subject.WenZhangDaoDu + '</p><br/>';
    str += '<p class="specialFont" >词语指津：' + subject.CiYuZhiJin + '</p><br/>';
    str += audioLocation(subject.Audio);
    switch (subject.QuestionsType) {
        case '阅读判断':
            str += subject.Title + '<hr>';
            $.each(subject.QuestionItem, function (ind, val) {
                str += '<div id="' + val.Id + '" class="Readingjudgment"> ';
                str += '<p>' + val.Sort + ' . ' + val.Title + '</p>';
                str += '<div class="fr"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="F" />×</div>';
                str += '<div class="fr"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="T" />√</div></div>';
            });
            break;
        case '图片选择':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += val.Sort + '. ' + queArray[0] + '<br/>';
                for (var i = 1; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                    str += queArray[i] + '</div>';
                }
                str += '<br/>';
            });
            break;
        case '阅读选择':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += val.Sort + '. ' + queArray[0] + '<br/>';
                for (var i = 1; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                    str += queArray[i] + '</div><br/>';
                }
                str += '<br/>';
            });
            break;
        case '完形填空':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += '<div id="' + val.Id + '" class="wanxingtiankognQue">' + val.Sort + '.&nbsp';
                for (var i = 0; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                    str += queArray[i] + '</div>';
                }
                str += '</div>';
            });
            break;
        case '语法词汇填空':
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content + '<hr/>';
            break;
        case '选词填空':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            str += '<tr>';
            for (var i = 0; i < xuanxiang.length; i++) {
                if ((i + 1) % 5 == 0 && i != 0) {
                    str += '<td>' + xuanxiang[i] + '</td></tr><tr>';
                } else {
                    str += '<td>' + xuanxiang[i] + '</td>';
                }
            }
            str += '</tr>';
            str += ' </table>';
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText  ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content;
            break;
        case '表格填空':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += '<div id="' + val.Id + '" class="wanxingtiankognQue">' + val.Sort + '.&nbsp';
                for (var i = 0; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                    str += queArray[i] + '</div>';
                }
                str += '</div>';
            });
            break;
        case '选句填空':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content;
            break;
        case '段落标题匹配':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content;
            break;
        case '阅读填空':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';
            });
            break;
        case '回答问题':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';
            });
            break;
        case '综合阅读':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';
            });
            break;
        case '选词填空-所给词的适当形式填空':
            str += '<p style="text-align:center" ><span style="border:1px solid;padding:5px">' + subject.WordSentence + '</span></p>';
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content;
            break;
        case '给首字母完形填空':
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content + '<hr/>';
            break;
        case '信息匹配':
            var content = subject.Title;
            $.each(subject.QuestionItem, function (ind, val) {
                content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
            });
            str += content + '<hr/>';
            break;
        default:;
    }
    str += '</div>';
    if (subject.WritingSkillId != "") {
        str += WritingSkillString(subject.WritingSkill);
    }
    if (subject.ReadingStrategyId != "" && subject.ReadingStrategyContent != null) {
        str += '<br/><p class="specialFont" >阅读策略：</p>'
        str += '<div>' + subject.ReadingStrategyContent + '</div>';
    }
    str == '</form>';
    return str;
}


//写作技巧拼接
function WritingSkillString(WritingSkillDetail) {
    var str = '<br/><p class="specialFont" >写作技巧：</p>';
    str += '<div id="' + WritingSkillDetail.Id + '">';
    switch (WritingSkillDetail.WritingSkillQuestionType) {
        case '选择':
            str += WritingSkillDetail.WritingSkillContent + '<hr/>';
            $.each(WritingSkillDetail.WritingSkillItemList, function (index, value) {
                var queArray = value.WritingSkillItemTitle.split('@');
                str += value.Sort + '. ' + queArray[0] + '<br/>';
                for (var i = 1; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + value.Id + '" name="' + value.Id + '" id="' + value.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                    str += queArray[i] + '</div><br/>';
                }
                str += '<br/>';
            });
            break;
        case '填空':
            str += WritingSkillDetail.WritingSkillContent + '<br/>';
            $.each(WritingSkillDetail.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                var answerStr = value.WritingSkillItemAnswer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');

                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + value.Id + '" id="' + value.Id + '" name="' + value.Id + '">');
                }
                str += '<div id="' + value.Id + '" class="TiankongQue">' + value.Sort + '. ' + content + '</div><br/>';
            });
            break;
        case '写句子':
            str += WritingSkillDetail.WritingSkillContent;
            $.each(WritingSkillDetail.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                if (content.indexOf('{1}') != -1) {
                    content = content.replace('{1}', '<textarea class="inputTextarea ' + value.Id + '" id="' + value.Id + '" name="' + value.Id + '"></textarea>');
                    str += '<div id="' + value.Id + '" class="TiankongQue">' + value.Sort + '. ' + content + '<br/>';
                } else {
                    str += '<div id="' + value.Id + '" class="TiankongQue">' + value.Sort + '. ' + content + '<textarea class="inputTextarea ' + value.Id + '" id="' + value.Id + '" name="' + value.Id + '"></textarea>' + '<br/>';
                }
                str += '</div><br/>';
            });
            break;
        case '写段落':
            str += WritingSkillDetail.WritingSkillContent;
            $.each(WritingSkillDetail.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                if (content.indexOf('{1}') != -1) {
                    content = content.replace('{1}', '<textarea class="inputTextareaWriting ' + value.Id + '" id="' + value.Id + '" name="' + value.Id + '"></textarea>');
                    str += '<div id="' + value.Id + '" class="TiankongQue">' + value.Sort + '. ' + content + '<br/>';
                } else {
                    str += '<div id="' + value.Id + '" class="TiankongQue">' + value.Sort + '. ' + content + '<textarea class="inputTextareaWriting ' + value.Id + '" id="' + value.Id + '" name="' + value.Id + '"></textarea>' + '<br/>';
                }
                str += '</div><br/>';
            });
            break;
        default:;
    }
    str += '</div>';
    return str;
}
//================================错题库=================================

//篇章拼接错题库
function SubjectStringWrong(subject) {
    var existError = false;
    var str = '';
    str += '<form id = "form1" autocomplete="off" style=" overflow:auto;padding:0 10px;" ><div id="' + subject.id + '">';
    str += '<p class="specialFontTitle" >话题：' + subject.topic + '&nbsp|&nbsp文体：' + subject.literaryForm + '&nbsp|&nbsp';
    str += '题型：' + subject.questionsType + '&nbsp|&nbsp难度：' + subject.difficulty + '&nbsp|&nbsp;';
    str += '词数：' + subject.words + '&nbsp|&nbsp分数：' + subject.score + '</p>';
    str += '<h3 style="margin-top: 20px;">' + subject.SubjectName + '</h3><br/>';
    str += '<p class="specialFont" >文章导读：' + subject.WenZhangDaoDu + '</p><br/>';
    str += '<p class="specialFont" >词语指津：' + subject.CiYuZhiJin + '</p><br/>';
    str += audioLocation(subject.Audio);
    switch (subject.questionsType) {
        case '阅读判断':
            str += subject.name + '<hr>';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    str += '<div id="' + val.id + '" class="Readingjudgment"> ';
                    str += '<p>' + val.Sort + ' . ' + val.Title + '</p>';
                    str += '<div class="fr"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="F" />×</div>';
                    str += '<div class="fr"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="T" />√</div></div>';
                    str += '正确答案：' + val.answer + '<br/>';
                    str += '大能力：' + val.bigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    str += '解析：' + val.analysis + '<br/>';
                }
            });
            break;
        case '图片选择':
            str += subject.name + '<hr/>';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    var queArray = val.title.split('@');
                    str += val.sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += '<br/><br/>';

                    str += '正确答案：' + val.answer + '<br/>';
                    str += '大能力：' + val.bigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    str += '解析：' + val.analysis + '<br/>';
                }
            });
            break;
        case '阅读选择':
            str += subject.name + '<hr/>';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    var queArray = val.title.split('@');
                    str += val.sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div><br/>';
                    }
                    str += '<br/>';

                    str += '正确答案：' + val.answer + '<br/>';
                    str += '大能力：' + val.bigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    str += '解析：' + val.analysis + '<br/>';
                }
            });
            break;
        case '完形填空':
            str += subject.name + '<hr/>';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    var queArray = val.title.split('@');
                    str += '<div id="' + val.id + '" class="wanxingtiankognQue">' + val.sort + '.&nbsp';
                    for (var i = 0; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += '</div>';

                    str += '正确答案：' + val.answer + '<br/>';
                    str += '大能力：' + val.bigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    str += '解析：' + val.analysis + '<br/>';
                }
            });
            break;
        case '语法词汇填空':
            var content = subject.name;
            var newStr = '';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += val.sort + ' . ';
                    newStr += '正确答案：' + val.answer + '<br/>';
                    newStr += '大能力：' + val.bigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    newStr += '解析：' + val.analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '选词填空':
            /*var xuanxiang = subject.wordSentence.split('|');
            str += '<table class="import">';
            str += '<tr>';
            for (var i = 0; i < xuanxiang.length; i++) {
                if ((i + 1) % 5 == 0 && i != 0) {
                    str += '<td>' + xuanxiang[i] + '</td></tr><tr>';
                } else {
                    str += '<td>' + xuanxiang[i] + '</td>';
                }
            }*/
            str += '</tr>';
            str += ' </table>';
            var content = subject.name;
            var newStr = '';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += val.sort + ' . ';
                    newStr += '正确答案：' + val.answer + '<br/>';
                    newStr += '大能力：' + val.bigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    newStr += '解析：' + val.analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '表格填空':
            str += subject.name + '<hr/>';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    var queArray = val.title.split('@');
                    str += '<div id="' + val.id + '" class="wanxingtiankognQue">' + val.sort + '.&nbsp';
                    for (var i = 0; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += '</div>';

                    str += '正确答案：' + val.answer + '<br/>';
                    str += '大能力：' + val.bigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    str += '解析：' + val.analysis + '<br/>';
                }
            });
            break;
        case '选句填空':
            // var xuanxiang = subject.wordSentence.split('|');
            // str += '<table class="import">';
            // for (var i = 0; i < xuanxiang.length; i++) {
            //     str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            // }
            // str += ' </table>';
            var content = subject.name;
            var newStr = '';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += val.sort + ' . ';
                    newStr += '正确答案：' + val.answer + '<br/>';
                    newStr += '大能力：' + val.bigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    newStr += '解析：' + val.analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '段落标题匹配':
            var xuanxiang = subject.sordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.name;
            var newStr = '';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += val.sort + ' . ';
                    newStr += '正确答案：' + val.answer + '<br/>';
                    newStr += '大能力：' + val.bigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    newStr += '解析：' + val.analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '阅读填空':
            str += subject.name + '<hr/>';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                var answerStr = val.answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    if (val.isError == null) {
                        existError = true;
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }
                str += '<div id="' + val.id + '" class="yuedutiankongQue">' + val.sort + '. ' + content + '</div>';

                str += '正确答案：' + val.answer + '<br/>';
                str += '大能力：' + val.bigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                str += '解析：' + val.analysis + '<br/>';
            });
            break;
        case '回答问题':
            str += subject.name + '<hr/>';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                var answerStr = val.answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    if (val.isError == null) {
                        existError = true;
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }
                str += '<div id="' + val.id + '" class="yuedutiankongQue">' + val.sort + '. ' + content + '</div>';

                str += '正确答案：' + val.answer + '<br/>';
                str += '大能力：' + val.bigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                str += '解析：' + val.analysis + '<br/>';
            });
            break;
        case '综合阅读':
            str += subject.name + '<hr/>';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                var answerStr = val.answer;
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    if (val.isError == null) {
                        existError = true;
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }
                str += '<div id="' + val.id + '" class="yuedutiankongQue">' + val.sort + '. ' + content + '</div>';

                str += '正确答案：' + val.answer + '<br/>';
                str += '大能力：' + val.bigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                str += '解析：' + val.analysis + '<br/>';
            });
            break;
        case '选词填空-所给词的适当形式填空':
            str += '<p style="text-align:center" ><span style="border:1px solid;padding:5px">' + subject.wordSentence + '</span></p>';
            var content = subject.Title;
            var newStr = '';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += val.sort + ' . ';
                    newStr += '正确答案：' + val.answer + '<br/>';
                    newStr += '大能力：' + val.bigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    newStr += '解析：' + val.analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '给首字母完形填空':
            var content = subject.name;
            var newStr = '';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += val.Sort + ' . ';
                    newStr += '正确答案：' + val.answer + '<br/>';
                    newStr += '大能力：' + val.bigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    newStr += '解析：' + val.analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '信息匹配':
            var content = subject.name;
            var newStr = '';
            $.each(subject.englishArticleQuestionItem, function (ind, val) {
                if (val.isError == null) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += val.Sosortrt + ' . ';
                    newStr += '正确答案：' + val.answer + '<br/>';
                    newStr += '大能力：' + val.bigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.smallKnowledge) + '<br/>';
                    newStr += '解析：' + val.analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        default:;
    }
    str += '</div>';
    //if (subject.WritingSkillId != "") {
    //    str += WritingSkillStringWrong(subject.WritingSkillDetail);
    //}
    str += '</form>';
    str =existError?str:'';
    return str;
}
function SmallSubString(str) {
    if (str == null) {
        return "";
    }
    if (str.indexOf('|') == -1) {
        return str;
    } else {
        return str.split('|')[0];
    }
}
//写作技巧拼接错题库
function WritingSkillStringWrong(writingSkill) {
    var str = '<br/><p class="specialFont" >写作技巧：</p>';
    str += '<div id="' + writingSkill.id + '">';
    switch (writingSkill.WritingSkillQuestionType) {
        case '选择':
            str += writingSkill.WritingSkillContent + '<hr/>';
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                if (value.WritingSkillItemIsError == 0) {
                    var queArray = value.WritingSkillItemTitle.split('@');
                    str += value.sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + value.id + '" name="' + value.id + '" id="' + value.id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div><br/>';
                    }
                    str += '<br/>';

                    str += '正确答案：' + value.WritingSkillItemAnswer + '<br/>';
                    str += '解析：' + value.WritingSkillItemAnalysis + '<br/>';
                }
            });
            break;
        case '填空':
            str += writingSkill.WritingSkillContent + '<br/>';
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                var answerStr = value.WritingSkillItemAnswer;
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');

                if (value.WritingSkillItemIsError == 0) {
                    for (var i = 0; i < answerArray.length; i++) {
                        var relIndex = i + 1;
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + value.id + '" id="' + value.id + '" name="' + value.id + '">');
                    }
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '</div><br/>';
                    str += '正确答案：' + value.WritingSkillItemAnswer + '<br/>';
                    str += '解析：' + value.WritingSkillItemAnalysis + '<br/>';
                }
            });
            break;
        case '写句子':
            str += writingSkill.WritingSkillContent + '<hr/>';
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                if (content.indexOf('{1}') != -1) {
                    content = content.replace('{1}', '<textarea class="inputTextarea ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>');
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '<br/>';
                } else {
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '<textarea class="inputTextarea ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>' + '<br/>';
                }
                str += '</div><br/>';
            });
            break;
        case '写段落':
            str += writingSkill.WritingSkillContent + '<hr/>';
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                if (content.indexOf('{1}') != -1) {
                    content = content.replace('{1}', '<textarea class="inputTextareaWriting ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>');
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '<br/>';
                } else {
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '<textarea class="inputTextareaWriting ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>' + '<br/>';
                }
                str += '</div><br/>';
            });
            break;
        default:;
    }
    str += '</div>';
    if (str == '<br/><p class="specialFont" >写作技巧：</p><div id="' + writingSkill.id + '">' + writingSkill.WritingSkillContent + '<hr/></div>') {
        return '';
    }
    return str;
}

//================================成绩统计===============================

//篇章拼接成绩统计
function SubjectStringStatistic(subject) {
    var str = '';
    str += '<form id = "form1" autocomplete="off" style=" overflow:auto;padding:0 10px;" ><div id="' + subject.Id + '">';
    str += '<p class="specialFontTitle" >话题：' + subject.Topic + '&nbsp|&nbsp文体：' + subject.LiteraryForm + '&nbsp|&nbsp';
    str += '题型：' + subject.QuestionsType + '&nbsp|&nbsp难度：' + subject.Difficulty + '&nbsp|&nbsp;';
    str += '词数：' + subject.Words + '&nbsp|&nbsp分数：' + subject.Score + '</p>';
    str += '<h3 style="margin-top: 20px;">' + subject.Name + '</h3><br/>';
    str += '<p class="specialFont" >文章导读：' + subject.WenZhangDaoDu + '</p><br/>';
    str += '<p class="specialFont" >词语指津：' + subject.CiYuZhiJin + '</p><br/>';
    str += audioLocation(subject.Audio);
    switch (subject.QuestionsType) {
        case '阅读判断':
            str += subject.Title + '<hr>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                str += '<div id="' + val.Id + '" class="Readingjudgment"> ';
                str += '<p>' + val.Sort + ' . ' + val.Title + '</p>';
                //答案对错显示
                str += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                str += '<div class="fr"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="F" />×</div>';
                str += '<div class="fr"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="T" />√</div></div>';

                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '图片选择':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += val.Sort + '. ' + queArray[0] + '<br/>';
                for (var i = 1; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                    str += queArray[i];
                    str += '</div>';
                }
                //答案对错显示
                str += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                str += '<br/>';

                str += '<br/>正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '阅读选择':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += val.Sort + '. ' + queArray[0];
                //答案对错显示
                str += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                str += '<br/>';
                for (var i = 1; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                    str += queArray[i];
                    str += '</div>';
                }
                str += '<br/>';

                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '完形填空':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += '<div id="' + val.Id + '" class="wanxingtiankognQue">' + val.Sort + '.&nbsp';
                for (var i = 0; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                    str += queArray[i] + '</div>';
                }
                //答案对错显示
                str += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                str += '</div>';

                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '语法词汇填空':
            var content = subject.Title;
            var analysis = '';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var newStr = '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">';
                //答案对错显示
                newStr += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                content = content.replace('{' + val.Sort + '}', newStr);

                analysis += val.Sort + ' . ';
                analysis += '正确答案：' + val.Answer + '<br/>';
                analysis += '大能力：' + val.BigKnowledge + '<br/>';
                analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                analysis += '解析：' + val.Analysis + '<br/>';
            });
            str += content + '<hr/>' + analysis;
            break;
        case '选词填空':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            str += '<tr>';
            for (var i = 0; i < xuanxiang.length; i++) {
                if ((i + 1) % 5 == 0 && i != 0) {
                    str += '<td>' + xuanxiang[i] + '</td></tr><tr>';
                } else {
                    str += '<td>' + xuanxiang[i] + '</td>';
                }
            }
            str += '</tr>';
            str += ' </table>';
            var content = subject.Title;
            var analysis = '';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var newStr = '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">';
                //答案对错显示
                newStr += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                content = content.replace('{' + val.Sort + '}', newStr);

                analysis += '正确答案：' + val.Answer + '<br/>';
                analysis += '大能力：' + val.BigKnowledge + '<br/>';
                analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                analysis += '解析：' + val.Analysis + '<br/>';
            });
            str += content + '<hr/>' + analysis;
            break;
        case '表格填空':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var queArray = val.Title.split('@');
                str += '<div id="' + val.Id + '" class="wanxingtiankognQue">' + val.Sort + '.&nbsp';
                for (var i = 0; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                    str += queArray[i] + '</div>';
                }
                //答案对错显示
                str += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                str += '</div>';

                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '选句填空':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.Title;
            var analysis = '';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var newStr = '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">';
                //答案对错显示
                newStr += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                content = content.replace('{' + val.Sort + '}', newStr);

                analysis += '正确答案：' + val.Answer + '<br/>';
                analysis += '大能力：' + val.BigKnowledge + '<br/>';
                analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                analysis += '解析：' + val.Analysis + '<br/>';
            });
            str += content + '<hr/>' + analysis;
            break;
        case '段落标题匹配':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.Title;
            var analysis = '';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var newStr = '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">';
                //答案对错显示
                newStr += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                content = content.replace('{' + val.Sort + '}', newStr);

                analysis += '正确答案：' + val.Answer + '<br/>';
                analysis += '大能力：' + val.BigKnowledge + '<br/>';
                analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                analysis += '解析：' + val.Analysis + '<br/>';
            });
            str += content + '<hr/>' + analysis;
            break;
        case '阅读填空':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content;
                str += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" /></div>' : '<img style="width:3%" src="../../assets/img/w.png" /></div>';

                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '回答问题':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content;
                str += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" /></div>' : '<img style="width:3%" src="../../assets/img/w.png" /></div>';

                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '综合阅读':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content;
                str += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" /></div>' : '<img style="width:3%" src="../../assets/img/w.png" /></div>';

                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '选词填空-所给词的适当形式填空':
            str += '<p style="text-align:center" ><span style="border:1px solid;padding:5px">' + subject.WordSentence + '</span></p>';
            var content = subject.Title;
            var analysis = '';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var newStr = '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">';
                //答案对错显示
                newStr += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                content = content.replace('{' + val.Sort + '}', newStr);

                analysis += '正确答案：' + val.Answer + '<br/>';
                analysis += '大能力：' + val.BigKnowledge + '<br/>';
                analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                analysis += '解析：' + val.Analysis + '<br/>';
            });
            str += content + '<hr/>' + analysis;
            break;
        case '给首字母完形填空':
            var content = subject.Title;
            var analysis = '';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var newStr = '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">';
                //答案对错显示
                newStr += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                content = content.replace('{' + val.Sort + '}', newStr);

                analysis += '正确答案：' + val.Answer + '<br/>';
                analysis += '大能力：' + val.BigKnowledge + '<br/>';
                analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                analysis += '解析：' + val.Analysis + '<br/>';
            });
            str += content + '<hr/>' + analysis;
            break;
        case '信息匹配':
            var content = subject.Title;
            var analysis = '';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var newStr = '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">';
                //答案对错显示
                newStr += val.IsError == 1 ? '<img style="width:3%" src="../../assets/img/r.png" />' : '<img style="width:3%" src="../../assets/img/w.png" />';
                //答案对错显示
                content = content.replace('{' + val.Sort + '}', newStr);

                analysis += '正确答案：' + val.Answer + '<br/>';
                analysis += '大能力：' + val.BigKnowledge + '<br/>';
                analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                analysis += '解析：' + val.Analysis + '<br/>';
            });
            str += content + '<hr/>' + analysis;
            break;
        default:;
    }
    str += '</div>';
    if (subject.WritingSkillId != "") {
        str += WritingSkillStringStatistic(subject.WritingSkill);
    }
    if (subject.ReadingStrategyId != "" && subject.ReadingStrategy != null) {
        str += '<br/><p class="specialFont" >阅读策略：</p>'
        str += '<div>' + subject.ReadingStrategy + '</div>';
    }
    str == '</form>';
    return str;
}
//写作技巧拼接成绩统计
function WritingSkillStringStatistic(writingSkill) {
    var str = '<br/><p class="specialFont" >写作技巧：</p>';
    str += '<div id="' + writingSkill.id + '">';
    switch (writingSkill.WritingSkillQuestionType) {
        case '选择':
            str += writingSkill.WritingSkillContent + '<hr/>';
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                var queArray = value.WritingSkillItemTitle.split('@');
                str += value.sort + '. ' + queArray[0] + '<br/>';
                for (var i = 1; i < queArray.length; i++) {
                    str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + value.id + '" name="' + value.id + '" id="' + value.id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                    str += queArray[i] + '</div><br/>';
                }
                str += value.WritingSkillItemIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                str += '<br/>';
                str += '正确答案：' + value.WritingSkillItemAnswer + '<br/>';
                str += '解析：' + value.WritingSkillItemAnalysis + '<br/>';
            });
            break;
        case '填空':
            str += writingSkill.WritingSkillContent + '<br/>';
            var newStr = '';
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                var answerStr = value.WritingSkillItemAnswer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');

                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + value.id + '" id="' + value.id + '" name="' + value.id + '">');
                    if (value.WritingSkillItemIsError == 0) {
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + value.id + '" id="' + value.id + '" name="' + value.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }
                str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ';
                str += value.WritingSkillItemIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                str += content + '</div><br/>';

                str += '正确答案：' + value.WritingSkillItemAnswer + '<br/>';
                str += '<br/>解析：' + value.WritingSkillItemAnalysis + '<br/>';
            });
            break;
        case '写句子':
            str += writingSkill.WritingSkillContent;
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                if (content.indexOf('{1}') != -1) {
                    content = content.replace('{1}', '<textarea class="inputTextarea ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>');
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '';
                } else {
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '<textarea class="inputTextarea ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>';
                }
                str += '</div>';
            });
            if (writingSkill.WritingSkillSubmit == 0) {
                //教师尚未批改
                str += '<span style="color:red">教师尚未批改</span>';
            } else {
                //教师已评分
                str += '<span style="color:red">教师打分：' + writingSkill.WritingSkillStudentScore + '</span>';
                str += '<p style="color:red">教师评语：' + writingSkill.WritingSkillComment + '</p>';
            }
            break;
        case '写段落':
            str += writingSkill.WritingSkillContent;
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                if (content.indexOf('{1}') != -1) {
                    content = content.replace('{1}', '<textarea class="inputTextareaWriting ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>');
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '';
                } else {
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '<textarea class="inputTextareaWriting ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>';
                }
                str += '</div>';
            });
            if (writingSkill.WritingSkillSubmit == 0) {
                //教师尚未批改
                str += '<span style="color:red">教师尚未批改</span>';
            } else {
                //教师已评分
                str += '<span style="color:red">教师打分：' + writingSkill.WritingSkillStudentScore + '</span>';
                str += '<p style="color:red">教师评语：' + writingSkill.WritingSkillComment + '</p>';
            }
            break;
        default:;
    }
    str += '</div>';
    if (str == '<br/><p class="specialFont" >写作技巧：</p><div id="' + writingSkill.id + '"></div>') {
        return '';
    }
    return str;
}

//================================订正===================================

//篇章拼接订正
function SubjectStringCorrect(subject) {
    var str = '';
    str += '<form id = "form1" autocomplete="off" style=" overflow:auto;padding:0 10px;" ><div id="' + subject.Id + '">';
    str += '<p class="specialFontTitle" >话题：' + subject.Topic + '&nbsp|&nbsp文体：' + subject.LiteraryForm + '&nbsp|&nbsp';
    str += '题型：' + subject.QuestionsType + '&nbsp|&nbsp难度：' + subject.Difficulty + '&nbsp|&nbsp;';
    str += '词数：' + subject.Words + '&nbsp|&nbsp分数：' + subject.Score + '</p>';
    str += '<h3 style="margin-top: 20px;">' + subject.Name + '</h3><br/>';
    str += '<p class="specialFont" >文章导读：' + subject.WenZhangDaoDu + '</p><br/>';
    str += '<p class="specialFont" >词语指津：' + subject.CiYuZhiJin + '</p><br/>';
    str += audioLocation(subject.Audio);
    switch (subject.QuestionsType) {
        case '阅读判断':
            str += subject.Title + '<hr>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    str += '<div id="' + val.Id + '" class="Readingjudgment"> ';
                    str += '<p>' + val.Sort + ' . ' + val.Title + '</p>';
                    str += '<div class="fr"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="F" />×</div>';
                    str += '<div class="fr"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="T" />√</div></div>';
                    str += val.Analysis + '<br/>';
                // }
            });
            break;
        case '图片选择':
            str += subject.Title + '<hr/>';

            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    var queArray = val.Title.split('@');
                    str += val.Sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {

                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += val.Analysis + '<br/>';
                    str += '<br/>';
                // }
            });
            break;
        case '阅读选择':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    var queArray = val.Title.split('@');
                    str += val.Sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div><br/>';
                    }
                    str += val.Analysis + '<br/>';
                    str += '<br/>';
                // }
            });
            break;
        case '完形填空':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    var queArray = val.Title.split('@');
                    str += '<div id="' + val.Id + '" class="wanxingtiankognQue">' + val.Sort + '.&nbsp';
                    for (var i = 0; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += val.Analysis + '<br/>';
                    str += '</div>';
                // }
            });
            break;
        case '语法词汇填空':
            var content = subject.Title;
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    content += val.Analysis + '<br/>';
                // } else {
                    // content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>';
            break;
        case '选词填空':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            str += '<tr>';
            for (var i = 0; i < xuanxiang.length; i++) {
                if ((i + 1) % 5 == 0 && i != 0) {
                    str += '<td>' + xuanxiang[i] + '</td></tr><tr>';
                } else {
                    str += '<td>' + xuanxiang[i] + '</td>';
                }
            }
            str += '</tr>';
            str += ' </table>';
            var content = subject.Title;
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    content += val.Analysis + '<br/>';
                // } else {
                    // content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content;
            break;
        case '表格填空':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    var queArray = val.Title.split('@');
                    str += '<div id="' + val.Id + '" class="wanxingtiankognQue">' + val.Sort + '.&nbsp';
                    for (var i = 0; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += val.Analysis + '<br/>';
                    str += '</div>';
                // }
            });
            break;
        case '选句填空':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.Title;
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    content += val.Analysis + '<br/>';
                // } else {
                    // content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content;
            break;
        case '段落标题匹配':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.Title;
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    content += val.Analysis + '<br/>';
                // } else {
                    // content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content;
            break;
        case '阅读填空':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    // if (val.IsError == 0) {
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    // } else {
                    //     content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    // }
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';
                str += val.Analysis + '<br/>';
            });
            break;
        case '回答问题':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    // if (val.IsError == 0) {
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    // } else {
                    //     content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    // }
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';
                str += val.Analysis + '<br/>';
            });
            break;
        case '综合阅读':
            str += subject.Title + '<hr/>';
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    // if (val.IsError == 0) {
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    // } else {
                        // content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    // }
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';
                str += val.Analysis + '<br/>';
            });
            break;
        case '选词填空-所给词的适当形式填空':
            str += '<p style="text-align:center" ><span style="border:1px solid;padding:5px">' + subject.WordSentence + '</span></p>';
            var content = subject.Title;
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    content += val.Analysis + '<br/>';
                // } else {
                //     content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>';
            break;
        case '给首字母完形填空':
            var content = subject.Title;
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    content += val.Analysis + '<br/>';
                // } else {
                //     content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>';
            break;
        case '信息匹配':
            var content = subject.Title;
            $.each(subject.EnglishArticleQuestionItem, function (ind, val) {
                // if (val.IsError == 0) {
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    content += val.Analysis + '<br/>';
                // } else {
                //     content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>';
            break;
        default:;
    }
    str += '</div>';
    str == '</form>';
    return str;
}

//写作技巧拼接订正
function WritingSkillStringCorrect(writingSkill) {
    var str = '<br/><p class="specialFont" >写作技巧：</p>';
    str += '<div id="' + writingSkill.id + '">';
    switch (writingSkill.WritingSkillQuestionType) {
        case '选择':
            str += writingSkill.WritingSkillContent + '<hr/>';
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                if (value.WritingSkillItemIsError == 0) {
                    var queArray = value.WritingSkillItemTitle.split('@');
                    str += value.sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + value.id + '" name="' + value.id + '" id="' + value.id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div><br/>';
                    }
                    str += '<br/>';
                }
            });
            break;
        case '填空':
            str += writingSkill.WritingSkillContent + '<br/>';
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                var answerStr = value.WritingSkillItemAnswer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');

                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    if (value.WritingSkillItemIsError == 0) {
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + value.id + '" id="' + value.id + '" name="' + value.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }
                str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '</div><br/>';
            });
            break;
        case '写句子':
            str += writingSkill.WritingSkillContent;
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                if (content.indexOf('{1}') != -1) {
                    content = content.replace('{1}', '<textarea class="inputTextarea ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>');
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '<br/>';
                } else {
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '<textarea class="inputTextarea ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>' + '<br/>';
                }
                str += '</div><br/>';
            });
            break;
        case '写段落':
            str += writingSkill.WritingSkillContent;
            $.each(writingSkill.WritingSkillItemList, function (index, value) {
                var content = value.WritingSkillItemTitle;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                if (content.indexOf('{1}') != -1) {
                    content = content.replace('{1}', '<textarea class="inputTextareaWriting ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>');
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '<br/>';
                } else {
                    str += '<div id="' + value.id + '" class="TiankongQue">' + value.sort + '. ' + content + '<textarea class="inputTextareaWriting ' + value.id + '" id="' + value.id + '" name="' + value.id + '"></textarea>' + '<br/>';
                }
                str += '</div><br/>';
            });
            break;
        default:;
    }
    str += '</div>';
    if (str == '<br/><p class="specialFont" >写作技巧：</p><div id="' + writingSkill.id + '"></div>') {
        return '';
    }
    return str;
}

//================================错题库--教师===================================
//篇章拼接错题库
function TeacherSubjectStringWrongs(subject) {
    var existError = false;
    var str = '';
    str += '<form id = "form1" autocomplete="off" style=" overflow:auto;padding:0 10px;" ><div id="' + subject.Id + '">';
    str += '<p class="specialFontTitle" >话题：' + subject.Topic + '&nbsp|&nbsp文体：' + subject.LiteraryForm + '&nbsp|&nbsp';
    str += '题型：' + subject.QuestionsType + '&nbsp|&nbsp难度：' + subject.Difficulty + '&nbsp|&nbsp;';
    str += '词数：' + subject.Words + '&nbsp|&nbsp分数：' + subject.Score + '</p>';
    str += '<h3 style="margin-top: 20px;">' + subject.Name + '</h3><br/>';
    // str += '<p class="specialFont" >文章导读：' + subject.WenZhangDaoDu + '</p><br/>';
    // str += '<p class="specialFont" >词语指津：' + subject.CiYuZhiJin + '</p><br/>';
    // str += audioLocation(subject.Audio);
    switch (subject.QuestionsType) {
        case '阅读判断':
            str += subject.Title + '<hr>';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    str += '<div id="' + val.Id + '" class="Readingjudgment"> ';
                    str += '<p>' + val.Sort + ' . ' + val.Title + '</p>';
                    str += '<div class="fr"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="F" />×</div>';
                    str += '<div class="fr"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="T" />√</div></div>';

                    
                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                // }
            });
            break;
        case '图片选择':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    var queArray = val.Title.split('@');
                    str += val.Sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += '<br/><br/>';

                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                // }
            });
            break;
        case '阅读选择':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    var queArray = val.Title.split('@');
                    str += val.Sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div><br/>';
                    }
                    str += '<br/>';

                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                // }
            });
            break;
        case '完形填空':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    var queArray = val.Title.split('@');
                    str += '<div id="' + val.Id + '" class="wanxingtiankognQue">' + val.Sort + '.&nbsp';
                    for (var i = 0; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += '</div>';

                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                // }
            });
            break;
        case '语法词汇填空':
            var content = subject.Title;
            var newStr = '';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');

                    newStr += val.Sort + ' . ';
                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                // } else {
                //     content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '选词填空':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            str += '<tr>';
            for (var i = 0; i < xuanxiang.length; i++) {
                if ((i + 1) % 5 == 0 && i != 0) {
                    str += '<td>' + xuanxiang[i] + '</td></tr><tr>';
                } else {
                    str += '<td>' + xuanxiang[i] + '</td>';
                }
            }
            str += '</tr>';
            str += ' </table>';
            var content = subject.Title;
            var newStr = '';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');

                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                // } else {
                //     content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '表格填空':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    var queArray = val.Title.split('@');
                    str += '<div id="' + val.Id + '" class="wanxingtiankognQue">' + val.Sort + '.&nbsp';
                    for (var i = 0; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.Id + '" name="' + val.Id + '" id="' + val.Id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += '</div>';

                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                // }
            });
            break;
        case '选句填空':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.Title;
            var newStr = '';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');

                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                // } else {
                //     content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '段落标题匹配':
            var xuanxiang = subject.WordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.Title;
            var newStr = '';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');

                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                // } else {
                //     content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '阅读填空':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    // if (val.SubjectItemIsError == 0) {
                        existError = true;
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    // } else {
                    //     content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    // }
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';

                if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '回答问题':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    // if (val.SubjectItemIsError == 0) {
                        existError = true;
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    // } else {
                    //     content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    // }
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';

                if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '综合阅读':
            str += subject.Title + '<hr/>';
            $.each(subject.QuestionItem, function (ind, val) {
                var answerStr = val.Answer;
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.Title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    // if (val.SubjectItemIsError == 0) {
                        existError = true;
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');
                    // } else {
                        // content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    // }
                }
                str += '<div id="' + val.Id + '" class="yuedutiankongQue">' + val.Sort + '. ' + content + '</div>';

                if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '选词填空-所给词的适当形式填空':
            str += '<p style="text-align:center" ><span style="border:1px solid;padding:5px">' + subject.WordSentence + '</span></p>';
            var content = subject.Title;
            var newStr = '';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');

                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                // } else {
                    // content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '给首字母完形填空':
            var content = subject.Title;
            var newStr = '';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');

                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                // } else {
                //     content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '信息匹配':
            var content = subject.Title;
            var newStr = '';
            $.each(subject.QuestionItem, function (ind, val) {
                // if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.Sort + '}', '<input type="text" class="inputText ' + val.Id + '" id="' + val.Id + '" name="' + val.Id + '">');

                    if(val.ErrorStudentName!=null){
                       str += '答错学生：' + val.ErrorStudentName + '<br/>';
                    }else{
                        str += '答错学生：<br/>';
                    }
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                // } else {
                //     content = content.replace('{' + val.Sort + '}', '<u>' + val.Answer + '</u>');
                // }
            });
            str += content + '<hr/>' + newStr;
            break;
        default:;
    }
    str += '</div>';
    str += '</form>';
    str = existError ? str : '';
    return str;
}
//篇章拼接错题库
function TeacherSubjectStringWrong(subject) {
    var existError = false;
    var str = '';
    str += '<form id = "form1" autocomplete="off" style=" overflow:auto;padding:0 10px;" ><div id="' + subject.id + '">';
    str += '<p class="specialFontTitle" >话题：' + subject.topic + '&nbsp|&nbsp文体：' + subject.literaryForm + '&nbsp|&nbsp';
    str += '题型：' + subject.questionsType + '&nbsp|&nbsp难度：' + subject.difficulty + '&nbsp|&nbsp;';
    str += '词数：' + subject.words + '&nbsp|&nbsp分数：' + subject.score + '</p>';
    str += '<h3 style="margin-top: 20px;">' + subject.name + '</h3><br/>';
    str += '<p class="specialFont" >文章导读：' + subject.wenZhangDaoDu + '</p><br/>';
    str += '<p class="specialFont" >词语指津：' + subject.ciYuZhiJin + '</p><br/>';
    str += audioLocation(subject.audio);
    switch (subject.questionsType) {
        case '阅读判断':
            str += subject.title + '<hr>';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    str += '<div id="' + val.id + '" class="Readingjudgment"> ';
                    str += '<p>' + val.sort + ' . ' + val.title + '</p>';
                    str += '<div class="fr"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="F" />×</div>';
                    str += '<div class="fr"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="T" />√</div></div>';

                    str += '答错学生：' + val.sutName + '<br/>';
                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                }
            });
            break;
        case '图片选择':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    var queArray = val.title.split('@');
                    str += val.sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += '<br/><br/>';

                    str += '答错学生：' + val.sutName + '<br/>';
                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                }
            });
            break;
        case '阅读选择':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    var queArray = val.title.split('@');
                    str += val.sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div><br/>';
                    }
                    str += '<br/>';

                    str += '答错学生：' + val.sutName + '<br/>';
                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                }
            });
            break;
        case '完形填空':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    var queArray = val.title.split('@');
                    str += '<div id="' + val.id + '" class="wanxingtiankognQue">' + val.sort + '.&nbsp';
                    for (var i = 0; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += '</div>';

                    str += '答错学生：' + val.sutName + '<br/>';
                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                }
            });
            break;
        case '语法词汇填空':
            var content = subject.title;
            var newStr = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += val.sort + ' . ';
                    newStr += '答错学生：' + val.sutName + '<br/>';
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '选词填空':
            var xuanxiang = subject.wordSentence.split('|');
            str += '<table class="import">';
            str += '<tr>';
            for (var i = 0; i < xuanxiang.length; i++) {
                if ((i + 1) % 5 == 0 && i != 0) {
                    str += '<td>' + xuanxiang[i] + '</td></tr><tr>';
                } else {
                    str += '<td>' + xuanxiang[i] + '</td>';
                }
            }
            str += '</tr>';
            str += ' </table>';
            var content = subject.title;
            var newStr = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += '答错学生：' + val.sutName + '<br/>';
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '表格填空':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    var queArray = val.title.split('@');
                    str += '<div id="' + val.id + '" class="wanxingtiankognQue">' + val.sort + '.&nbsp';
                    for (var i = 0; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    str += '</div>';

                    str += '答错学生：' + val.sutName + '<br/>';
                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                }
            });
            break;
        case '选句填空':
            var xuanxiang = subject.wordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.title;
            var newStr = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += '答错学生：' + val.sutName + '<br/>';
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '段落标题匹配':
            var xuanxiang = subject.wordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.title;
            var newStr = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += '答错学生：' + val.sutName + '<br/>';
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '阅读填空':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    if (val.SubjectItemIsError == 0) {
                        existError = true;
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }
                str += '<div id="' + val.id + '" class="yuedutiankongQue">' + val.sort + '. ' + content + '</div>';

                str += '答错学生：' + val.sutName + '<br/>';
                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '回答问题':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    if (val.SubjectItemIsError == 0) {
                        existError = true;
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }
                str += '<div id="' + val.id + '" class="yuedutiankongQue">' + val.sort + '. ' + content + '</div>';

                str += '答错学生：' + val.sutName + '<br/>';
                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '综合阅读':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                var answerStr = val.Answer;
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    if (val.SubjectItemIsError == 0) {
                        existError = true;
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }
                str += '<div id="' + val.id + '" class="yuedutiankongQue">' + val.sort + '. ' + content + '</div>';

                str += '答错学生：' + val.sutName + '<br/>';
                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '选词填空-所给词的适当形式填空':
            str += '<p style="text-align:center" ><span style="border:1px solid;padding:5px">' + subject.wordSentence + '</span></p>';
            var content = subject.title;
            var newStr = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += '答错学生：' + val.sutName + '<br/>';
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '给首字母完形填空':
            var content = subject.title;
            var newStr = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += '答错学生：' + val.sutName + '<br/>';
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        case '信息匹配':
            var content = subject.title;
            var newStr = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    existError = true;
                    content = content.replace('{' + val.sort + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');

                    newStr += '答错学生：' + val.sutName + '<br/>';
                    newStr += '正确答案：' + val.Answer + '<br/>';
                    newStr += '大能力：' + val.BigKnowledge + '<br/>';
                    newStr += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    newStr += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + newStr;
            break;
        default:;
    }
    str += '</div>';
    str == '</form>';
    str = existError ? str : '';
    return str;
}

//订正详情

//篇章拼接订正
function TeacherSubjectStringCorrect(subject) {
    var str = '';
    str += '<form id = "form1" autocomplete="off" style=" overflow:auto;padding:0 10px;" ><div id="' + subject.id + '">';
    str += '<p class="specialFontTitle" >话题：' + subject.topic + '&nbsp|&nbsp文体：' + subject.literaryForm + '&nbsp|&nbsp';
    str += '题型：' + subject.questionsType + '&nbsp|&nbsp难度：' + subject.difficulty + '&nbsp|&nbsp;';
    str += '词数：' + subject.words + '&nbsp|&nbsp分数：' + subject.score + '</p>';
    str += '<h3 style="margin-top: 20px;">' + subject.name + '</h3><br/>';
    str += '<p class="specialFont" >文章导读：' + subject.wenZhangDaoDu + '</p><br/>';
    str += '<p class="specialFont" >词语指津：' + subject.ciYuZhiJin + '</p><br/>';
    switch (subject.questionsType) {
        case '阅读判断':
            str += subject.title + '<hr>';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    str += '<div id="' + val.id + '" class="Readingjudgment"> ';
                    str += '<p>' + val.sort + ' . ' + val.title + '</p>';
                    //答案对错显示
                    str += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    str += '<div class="fr"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="F" />×</div>';
                    str += '<div class="fr"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="T" />√</div></div>';

                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                }
            });
            break;
        case '图片选择':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var queArray = val.title.split('@');
                    str += val.sort + '. ' + queArray[0] + '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    //答案对错显示
                    str += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    str += '<br/>';

                    str += '<br/>正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                }
            });
            break;
        case '阅读选择':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var queArray = val.title.split('@');
                    str += val.sort + '. ' + queArray[0];
                    //答案对错显示
                    str += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    str += '<br/>';
                    for (var i = 1; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i - 1] + '" /><span> ' + optionDic[i - 1] + '. </span>';
                        str += queArray[i];
                        str += '</div>';
                    }
                    str += '<br/>';

                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                }
            });
            break;
        case '完形填空':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var queArray = val.title.split('@');
                    str += '<div id="' + val.id + '" class="wanxingtiankognQue">' + val.sort + '.&nbsp';
                    for (var i = 0; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    //答案对错显示
                    str += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    str += '</div>';

                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                }
            });
            break;
        case '语法词汇填空':
            var content = subject.title;
            var analysis = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var newStr = '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">';
                    //答案对错显示
                    newStr += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    content = content.replace('{' + val.sort + '}', newStr);

                    analysis += val.sort + ' . ';
                    analysis += '正确答案：' + val.Answer + '<br/>';
                    analysis += '大能力：' + val.BigKnowledge + '<br/>';
                    analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    analysis += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + analysis;
            break;
        case '选词填空':
            // var xuanxiang = subject.wordSentence.split('|');
            // str += '<table class="import">';
            // str += '<tr>';
            // for (var i = 0; i < xuanxiang.length; i++) {
            //     if ((i + 1) % 5 == 0 && i != 0) {
            //         str += '<td>' + xuanxiang[i] + '</td></tr><tr>';
            //     } else {
            //         str += '<td>' + xuanxiang[i] + '</td>';
            //     }
            // }
            str += '</tr>';
            str += ' </table>';
            var content = subject.title;
            var analysis = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var newStr = '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">';
                    //答案对错显示
                    newStr += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    content = content.replace('{' + val.sort + '}', newStr);

                    analysis += '正确答案：' + val.Answer + '<br/>';
                    analysis += '大能力：' + val.BigKnowledge + '<br/>';
                    analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    analysis += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + analysis;
            break;
        case '表格填空':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var queArray = val.title.split('@');
                    str += '<div id="' + val.id + '" class="wanxingtiankognQue">' + val.sort + '.&nbsp';
                    for (var i = 0; i < queArray.length; i++) {
                        str += '<div class="question" style="min-width:20%;margin-right:20px; display: inline-block;"><input type="radio" class="' + val.id + '" name="' + val.id + '" id="' + val.id + '" value="' + optionDic[i] + '" /><span> ' + optionDic[i] + '. </span>';
                        str += queArray[i] + '</div>';
                    }
                    //答案对错显示
                    str += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    str += '</div>';

                    str += '正确答案：' + val.Answer + '<br/>';
                    str += '大能力：' + val.BigKnowledge + '<br/>';
                    str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    str += '解析：' + val.Analysis + '<br/>';
                }
            });
            break;
        case '选句填空':
            var xuanxiang = subject.wordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.title;
            var analysis = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var newStr = '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">';
                    //答案对错显示
                    newStr += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    content = content.replace('{' + val.sort + '}', newStr);

                    analysis += '正确答案：' + val.Answer + '<br/>';
                    analysis += '大能力：' + val.BigKnowledge + '<br/>';
                    analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    analysis += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + analysis;
            break;
        case '段落标题匹配':
            var xuanxiang = subject.wordSentence.split('|');
            str += '<table class="import">';
            for (var i = 0; i < xuanxiang.length; i++) {
                str += '<tr><td>' + xuanxiang[i] + '</td></tr>';
            }
            str += ' </table>';
            var content = subject.title;
            var analysis = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var newStr = '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">';
                    //答案对错显示
                    newStr += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    content = content.replace('{' + val.sort + '}', newStr);

                    analysis += '正确答案：' + val.Answer + '<br/>';
                    analysis += '大能力：' + val.BigKnowledge + '<br/>';
                    analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    analysis += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + analysis;
            break;
        case '阅读填空':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    if (val.SubjectItemIsError == 0) {
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }

                str += '<div id="' + val.id + '" class="yuedutiankongQue">' + val.sort + '. ' + content;
                str += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" /></div>' : '<img style="width:3%" src="../../img/w.png" /></div>';

                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '回答问题':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                var answerStr = val.Answer;
                answerStr = answerStr.indexOf('^') == -1 ? answerStr : answerStr.split('^')[0];
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    if (val.SubjectItemIsError == 0) {
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }

                str += '<div id="' + val.id + '" class="yuedutiankongQue">' + val.sort + '. ' + content;
                str += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" /></div>' : '<img style="width:3%" src="../../img/w.png" /></div>';

                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '综合阅读':
            str += subject.title + '<hr/>';
            $.each(subject.questionItem, function (ind, val) {
                var answerStr = val.Answer;
                var answerArray = answerStr.indexOf('|') == -1 ? new Array(answerStr) : answerStr.split('|');
                var content = val.title;
                content = content.replace('<div>', '');
                content = content.replace('</div>', '');
                for (var i = 0; i < answerArray.length; i++) {
                    var relIndex = i + 1;
                    if (val.SubjectItemIsError == 0) {
                        content = content.replace('{' + relIndex + '}', '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">');
                    } else {
                        content = content.replace('{' + relIndex + '}', '<u>' + answerArray[i] + '</u>');
                    }
                }

                str += '<div id="' + val.id + '" class="yuedutiankongQue">' + val.sort + '. ' + content;
                str += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" /></div>' : '<img style="width:3%" src="../../img/w.png" /></div>';

                str += '正确答案：' + val.Answer + '<br/>';
                str += '大能力：' + val.BigKnowledge + '<br/>';
                str += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                str += '解析：' + val.Analysis + '<br/>';
            });
            break;
        case '选词填空-所给词的适当形式填空':
            str += '<p style="text-align:center" ><span style="border:1px solid;padding:5px">' + subject.wordSentence + '</span></p>';
            var content = subject.title;
            var analysis = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var newStr = '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">';
                    //答案对错显示
                    newStr += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    content = content.replace('{' + val.sort + '}', newStr);

                    analysis += '正确答案：' + val.Answer + '<br/>';
                    analysis += '大能力：' + val.BigKnowledge + '<br/>';
                    analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    analysis += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + analysis;
            break;
        case '给首字母完形填空':
            var content = subject.title;
            var analysis = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var newStr = '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">';
                    //答案对错显示
                    newStr += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    content = content.replace('{' + val.sort + '}', newStr);

                    analysis += '正确答案：' + val.Answer + '<br/>';
                    analysis += '大能力：' + val.BigKnowledge + '<br/>';
                    analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    analysis += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + analysis;
            break;
        case '信息匹配':
            var content = subject.title;
            var analysis = '';
            $.each(subject.questionItem, function (ind, val) {
                if (val.SubjectItemIsError == 0) {
                    var newStr = '<input type="text" class="inputText ' + val.id + '" id="' + val.id + '" name="' + val.id + '">';
                    //答案对错显示
                    newStr += val.CorrectionIsError == 1 ? '<img style="width:3%" src="../../img/r.png" />' : '<img style="width:3%" src="../../img/w.png" />';
                    //答案对错显示
                    content = content.replace('{' + val.sort + '}', newStr);

                    analysis += '正确答案：' + val.Answer + '<br/>';
                    analysis += '大能力：' + val.BigKnowledge + '<br/>';
                    analysis += '小能力：' + SmallSubString(val.SmallKnowledge) + '<br/>';
                    analysis += '解析：' + val.Analysis + '<br/>';
                } else {
                    content = content.replace('{' + val.sort + '}', '<u>' + val.Answer + '</u>');
                }
            });
            str += content + '<hr/>' + analysis;
            break;
        default:;
    }
    str += '</div>';
    str == '</form>';
    return str;
}

//================================话题--通用===================================

//弹出大话题
function OpenTopic(bName) {
    var options = {
        Id: bName
    };
    var datas = jsonPost("Topic/GetTopic", options);

    var bgArr = [
        "../../assets/img/topic/1.png",
        "../../assets/img/topic/2.png",
        "../../assets/img/topic/3.png",
        "../../assets/img/topic/4.png"
    ];
    var n = parseInt(Math.random() * (0 - 4) + 4);
    var str = '<div class="yulanTopic" style="background-image:url(' + bgArr[n] + ')"><img class="yulancloseimg" src="../../assets/img/closeRed.png" onclick="hidTopic();" />';

    str += "<div style='padding:10px;'><center><strong class='title'>" + datas.Id + "</strong></center><br/><strong>";
    str += datas.Content + "</strong></div></div>";
    $('body').append(str);
}

//弹出小话题
function OpenSamllTopic(sName) {
    var options = {
        Id: sName
    };
    var datas = jsonPost("Topic/GetSmallTopic", options);
    var str = '<div class="yulanSTopic" ><img class="yulancloseimg" src="../../assets/img/closeRed.png" onclick="hidSTopic();" />';
    str += "<div style='padding:20px'><center><strong>" + datas.Id + "</strong></center><br/>";
    str += datas.Content + "</div></div>";
    $('body').append(str);
}

//关闭大话题预览
function hidTopic() {
    var domNum = $(".yulanSTopic");
    if (domNum.length == 0) {
        $(".yulanTopic").hide("normal", function () {
            $(".yulanTopic").remove();
        });
    }
};

//关闭小话题预览
function hidSTopic() {
    $(".yulanSTopic").hide("normal", function () {
        $(".yulanSTopic").remove();
    });
};
//音频地址
function audioLocation(str) {
    //本地
    // var result = '<embed src="../../assets/vendor/Lyplayer.swf?path=../../audios/' + str + '&type=mp3&autoplay=false" type="application/x-shockwave-flash" width="200" height="27" quality="high"/><br/>'
    // return result;
    //网站
    var result = '<audio src="http://audio.keys-edu.com/shenyang/' + str + '"/></audio>'
    return result;
}