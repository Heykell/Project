'use strict';
const ready = function ready(fn) {
  return (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  )
    ? fn()
    : document.addEventListener('DOMContentLoaded', fn);
};
ready(function () {
  const { addFilter } = wp.hooks;
  const { __ } = wp.i18n;

  const addCurrencyFilters = (filters) => {
    return [
      {
        label: __('Currency', 'yay-currency'),
        staticParams: [],
        param: 'currency',
        showFilters: () => true,
        defaultValue: yayCurrencyAnalytics.defaultCurrency,
        filters: [...(wcSettings.multiCurrency || [])],
      },
      ...filters,
    ];
  };

  const currencies = Object.assign({}, ...yayCurrencyAnalytics.currencies);
  const updateReportCurrencies = (config, { currency }) => {
    if (currency && currencies[currency]) {
      return currencies[currency];
    }
    return config;
  };

  addFilter(
    'woocommerce_admin_dashboard_filters',
    'yay-currency',
    addCurrencyFilters
  );
  addFilter(
    'woocommerce_admin_revenue_report_filters',
    'yay-currency',
    addCurrencyFilters
  );
  addFilter(
    'woocommerce_admin_products_report_filters',
    'yay-currency',
    addCurrencyFilters
  );
  addFilter(
    'woocommerce_admin_orders_report_filters',
    'yay-currency',
    addCurrencyFilters
  );
  addFilter(
    'woocommerce_admin_variations_report_filters',
    'yay-currency',
    addCurrencyFilters
  );
  addFilter(
    'woocommerce_admin_categories_report_filters',
    'yay-currency',
    addCurrencyFilters
  );

  addFilter(
    'woocommerce_admin_coupons_report_filters',
    'yay-currency',
    addCurrencyFilters
  );

  addFilter(
    'woocommerce_admin_taxes_report_filters',
    'yay-currency',
    addCurrencyFilters
  );
  
  
  addFilter(
    'woocommerce_admin_report_currency',
    'yay-currency',
    updateReportCurrencies
  );

  jQuery(document).on('click', '.woocommerce-filters-filter__content-list-item', function (event) {
    console.log("clicked!!!!")
    event.stopPropagation();
    event.preventDefault();
    const current_url = new URL(window.location.href),
        params = new URLSearchParams(current_url.search),
        current_path = params.getAll("path");
    if( !current_path.includes('/analytics/revenue') ) {
      return;
    }
    location.reload();
  });

});
