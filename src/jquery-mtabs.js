(function ($) {
    'use strict';
    var tabCount = 0,
        historyTab = 0;

    $.fn.mtabs = function (options) {
        function selectTab(tabRoot, tabId, pushState) {
            pushState = pushState === undefined ? true : pushState;
            $(tabRoot).find('.tabs_link').removeClass('active');
            $(tabRoot).find('.tabs_link[data-id="' + tabId + '"]').addClass('active');
            $(tabRoot).find('.tabs_content').hide();
            $(tabRoot).find('.tabs_content[data-id="' + tabId + '"]').show();
            if (pushState) {
                if (history.state === null || history.state.tabId !== tabId) {
                    history.pushState({element: 'tabs', 'tabId': tabId, 'rootId': tabRoot.data('id')}, tabId, '');
                }
            }
        };

        window.onpopstate = function (event) {
            var tabRoot, s = history.state;
            if (s.element === 'tabs') {
                $('.tabs').each(function () {
                    if ($(this).data('id') === s.rootId) {
                        tabRoot = $(this);
                    }
                });
                selectTab(tabRoot, s.tabId, false);
            }
        };

        return this.each(function () {
            var tabRoot = $(this);
            var tabs = $(this).find('.tabs_list .tabs_content');
            var navPanel = $(this).find('.tabs_navigation_panel');
            tabCount = tabCount + 1;
            tabRoot.data('id', tabCount);

            tabs.each(function (k, tab) {
                var link = $('<a class="tabs_link" data-id="' + $(tab).data('id') + '">' + $(tab).data('title') + '</a>');
                (function (tabCount) {
                    link.click(function (event) {
                        selectTab(tabRoot, $(this).data('id'), historyTab === tabCount);
                        $(tab).trigger('tabs:select');
                    });
                }(tabCount));

                navPanel.append(link);
            });
            if (historyTab === 0) {
                historyTab = tabCount;
            }
            selectTab(tabRoot, $(tabs[0]).data('id'), historyTab === tabCount);
        });
    };
}(jQuery));
