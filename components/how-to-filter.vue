<template>
  <p class="mb-4">We provide compositional filters for all analytes in the database in two ways:</p>
  <ol class="list-decimal pl-4 space-y-4">
    <li>
      For most-used data (major elements, a typical set of trace elements and isotope ratios), we offer a filter based on minimum and maximum values.
      Samples that do not have analytical values for a particular analyte will not be selected.
      Some elemental concentrations are reported in the original publications in different form, such as. FeO or Fe2O3, some even Fe3O4, or Fe atomic %) or when trace elements are given as ppm, µg/g, ppb or wt%. For these cases, we have recalculated all data to a single analytical unit in order to allow selecting corresponding minimum and maximum values for filters.
      However, when downloading selected data, the original analytical units or analytes are transferred as given in the original literature together with the recalculated values.
    </li>
    <li>
      All data can be selected according to “must have”, i.e. only data are selected by this filter for which compositional values are included in a sample’s analysis.
    </li>
  </ol>
</template>
