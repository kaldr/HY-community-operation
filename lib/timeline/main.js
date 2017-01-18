(function() {
  var timelineController;

  angular.module('timeline', []);

  timelineController = function($scope) {
    var data;
    data = {
      timeline: {
        headline: '最近处理过的事项',
        type: 'default',
        text: "这里列出来最近处理过的任何事项",
        date: [
          {
            startDate: '2016,10,12,08,01',
            endDate: '2016,10,12,08,01',
            headline: "提交三清单",
            text: "Come on xiongdi"
          }, {
            startDate: '2016,10,14,08,01',
            endDate: '2016,10,16,08,01',
            headline: "通过部门经理审核",
            text: "Come on xiongdi"
          }, {
            startDate: '2016,10,15,08,01',
            endDate: '2016,10,18,08,01',
            headline: "通过线路经理审核",
            text: "Come on xiongdi"
          }, {
            startDate: '2016,10,18,08,01',
            endDate: '2016,10,20,08,01',
            headline: "通过财务经理理审核",
            text: "Come on xiongdi"
          }
        ],
        era: [
          {
            startDate: '2016,10,12,08,01',
            endDate: '2016,10,12,08,01',
            headline: "提交三清单",
            text: "Come on xiongdi"
          }, {
            startDate: '2016,10,14,08,01',
            endDate: '2016,10,16,08,01',
            headline: "通过部门经理审核",
            text: "Come on xiongdi"
          }, {
            startDate: '2016,10,15,08,01',
            endDate: '2016,10,18,08,01',
            headline: "通过线路经理审核",
            text: "Come on xiongdi"
          }, {
            startDate: '2016,10,18,08,01',
            endDate: '2016,10,20,08,01',
            headline: "通过财务经理理审核",
            text: "Come on xiongdi"
          }
        ]
      }
    };
    return createStoryJS({
      type: 'timeline',
      width: '800',
      height: '600',
      source: data,
      embed_id: 'timesheet'
    });
  };

  angular.module('timeline').controller('timelineController', timelineController);

}).call(this);
