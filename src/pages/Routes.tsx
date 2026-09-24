
import React from 'react';
import Ipv4ToIpv6Tool from '../features/network/Ipv4ToIpv6Tool';
import Base64ConverterTool from '../features/network/Base64ConverterTool';
import DataUnitConverterTool from '../features/network/DataUnitConverterTool';
import ChmodCalculatorTool from '../features/network/ChmodCalculatorTool';
import MacGeneratorTool from '../features/network/MacGeneratorTool';
import BandwidthCalculatorTool from '../features/network/BandwidthCalculatorTool';
import SubnetCalculatorTool from '../features/network/SubnetCalculatorTool';
import VatCalculatorTool from '../features/finance/VatCalculatorTool';
import InflationCalculatorTool from '../features/finance/InflationCalculatorTool';
import ProfitMarginTool from '../features/finance/ProfitMarginTool';
import AutoLoanTool from '../features/finance/AutoLoanTool';
import DiscountCalculatorTool from '../features/finance/DiscountCalculatorTool';
import TipCalculatorTool from '../features/finance/TipCalculatorTool';
import RoiCalculatorTool from '../features/finance/RoiCalculatorTool';
import SalaryCalculatorTool from '../features/finance/SalaryCalculatorTool';
import MortgageCalculatorTool from '../features/finance/MortgageCalculatorTool';
import PercentageChangeTool from '../features/math/PercentageChangeTool';
import PythagoreanTheoremTool from '../features/math/PythagoreanTheoremTool';
import CircleCalculatorTool from '../features/math/CircleCalculatorTool';
import TriangleCalculatorTool from '../features/math/TriangleCalculatorTool';
import TimeCalculatorTool from '../features/time/TimeCalculatorTool';
import UnixTimestampTool from '../features/time/UnixTimestampTool';
import BusinessDaysTool from '../features/time/BusinessDaysTool';
import MacroCalculatorTool from '../features/health/MacroCalculatorTool';
import BodyFatCalculatorTool from '../features/health/BodyFatCalculatorTool';
import OneRepMaxTool from '../features/health/OneRepMaxTool';
import TdeeCalculatorTool from '../features/health/TdeeCalculatorTool';
import BmiCalculatorTool from '../features/health/BmiCalculatorTool';
import RoofPitchTool from '../features/engineering/RoofPitchTool';
import BrickEstimatorTool from '../features/engineering/BrickEstimatorTool';
import ColumnBucklingTool from '../features/engineering/ColumnBucklingTool';
import RebarWeightTool from '../features/engineering/RebarWeightTool';
import ConcreteVolumeTool from '../features/engineering/ConcreteVolumeTool';
import BuoyancyForceTool from '../features/engineering/BuoyancyForceTool';
import PumpPowerTool from '../features/engineering/PumpPowerTool';
import HeatConductionTool from '../features/engineering/HeatConductionTool';
import SpecificHeatCapacityTool from '../features/engineering/SpecificHeatCapacityTool';
import IdealGasLawTool from '../features/engineering/IdealGasLawTool';
import PotentialEnergyTool from '../features/engineering/PotentialEnergyTool';
import KineticEnergyTool from '../features/engineering/KineticEnergyTool';
import BeamDeflectionTool from '../features/engineering/BeamDeflectionTool';
import FlowRateTool from '../features/engineering/FlowRateTool';
import ReynoldsNumberTool from '../features/engineering/ReynoldsNumberTool';
import SpringConstantTool from '../features/engineering/SpringConstantTool';
import AreaMomentInertiaTool from '../features/engineering/AreaMomentInertiaTool';
import HookesLawTool from '../features/engineering/HookesLawTool';
import TorquePowerTool from '../features/engineering/TorquePowerTool';
import GearRatioTool from '../features/engineering/GearRatioTool';
import AntennaLengthTool from '../features/engineering/AntennaLengthTool';
import WavelengthFrequencyTool from '../features/engineering/WavelengthFrequencyTool';
import RlcResonanceTool from '../features/engineering/RlcResonanceTool';
import HighPassFilterTool from '../features/engineering/HighPassFilterTool';
import LowPassFilterTool from '../features/engineering/LowPassFilterTool';
import CoaxialImpedanceTool from '../features/engineering/CoaxialImpedanceTool';
import WireGaugeConverterTool from '../features/engineering/WireGaugeConverterTool';
import VoltageDropCalculatorTool from '../features/engineering/VoltageDropCalculatorTool';
import PcbTraceWidthTool from '../features/engineering/PcbTraceWidthTool';
import Timer555CalculatorTool from '../features/engineering/Timer555CalculatorTool';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CategoriesPage from './CategoriesPage';
import CategoryPage from './CategoryPage';
import ToolNotFound from './ToolNotFound';
import About from './About';
import Privacy from './Privacy';
import Terms from './Terms';
import Ecosystem from './Ecosystem';
import CgpaCalculatorTool from '../features/student/CgpaCalculatorTool';
import GpaCalculatorTool from '../features/student/GpaCalculatorTool';
import PercentageCalculatorTool from '../features/student/PercentageCalculatorTool';
import AttendanceCalculatorTool from '../features/student/AttendanceCalculatorTool';
import BunkCalculatorTool from '../features/student/BunkCalculatorTool';
import RequiredAttendanceCalculatorTool from '../features/student/RequiredAttendanceCalculatorTool';
import ExamCountdownTool from '../features/student/ExamCountdownTool';
import StudyTimerTool from '../features/student/StudyTimerTool';
import SemesterPlannerTool from '../features/student/SemesterPlannerTool';
import GradeCalculatorTool from '../features/student/GradeCalculatorTool';
import MarksPercentageCalculatorTool from '../features/student/MarksPercentageCalculatorTool';
import SgpaCalculatorTool from '../features/student/SgpaCalculatorTool';
import CgpaToPercentageTool from '../features/student/CgpaToPercentageTool';
import PercentageToCgpaTool from '../features/student/PercentageToCgpaTool';
import AgeCalculatorTool from '../features/student/AgeCalculatorTool';
import OhmsLawCalculatorTool from '../features/engineering/OhmsLawCalculatorTool';
import ResistorCalculatorTool from '../features/engineering/ResistorCalculatorTool';
import ResistorColorCodeTool from '../features/engineering/ResistorColorCodeTool';
import SeriesResistorCalculatorTool from '../features/engineering/SeriesResistorCalculatorTool';
import ParallelResistorCalculatorTool from '../features/engineering/ParallelResistorCalculatorTool';
import VoltageDividerCalculatorTool from '../features/engineering/VoltageDividerCalculatorTool';
import CurrentDividerCalculatorTool from '../features/engineering/CurrentDividerCalculatorTool';
import LedResistorCalculatorTool from '../features/engineering/LedResistorCalculatorTool';
import PowerCalculatorTool from '../features/engineering/PowerCalculatorTool';
import CapacitorCalculatorTool from '../features/engineering/CapacitorCalculatorTool';
import CapacitorSeriesCalculatorTool from '../features/engineering/CapacitorSeriesCalculatorTool';
import CapacitorParallelCalculatorTool from '../features/engineering/CapacitorParallelCalculatorTool';
import RcTimeConstantTool from '../features/engineering/RcTimeConstantTool';
import RlTimeConstantTool from '../features/engineering/RlTimeConstantTool';
import ResonantFrequencyTool from '../features/engineering/ResonantFrequencyTool';
import FrequencyPeriodTool from '../features/engineering/FrequencyPeriodTool';
import PeriodFrequencyTool from '../features/engineering/PeriodFrequencyTool';
import DecibelCalculatorTool from '../features/engineering/DecibelCalculatorTool';
import AdcResolutionTool from '../features/engineering/AdcResolutionTool';
import DacResolutionTool from '../features/engineering/DacResolutionTool';
import PwmCalculatorTool from '../features/engineering/PwmCalculatorTool';
import TransformerCalculatorTool from '../features/engineering/TransformerCalculatorTool';
import BatteryRuntimeTool from '../features/engineering/BatteryRuntimeTool';
import OpampCalculatorTool from '../features/engineering/OpampCalculatorTool';
import ElectricalUnitConverterTool from '../features/engineering/ElectricalUnitConverterTool';
import ScientificCalculatorTool from '../features/math/ScientificCalculatorTool';
import FractionCalculatorTool from '../features/math/FractionCalculatorTool';
import RatioCalculatorTool from '../features/math/RatioCalculatorTool';
import AverageCalculatorTool from '../features/math/AverageCalculatorTool';
import StandardDeviationTool from '../features/math/StandardDeviationTool';
import VarianceCalculatorTool from '../features/math/VarianceCalculatorTool';
import QuadraticEquationTool from '../features/math/QuadraticEquationTool';
import SimpleInterestTool from '../features/math/SimpleInterestTool';
import CompoundInterestTool from '../features/math/CompoundInterestTool';
import EmiCalculatorTool from '../features/math/EmiCalculatorTool';
import JsonFormatterTool from '../features/developer/JsonFormatterTool';
import JsonValidatorTool from '../features/developer/JsonValidatorTool';
import JsonToCsvTool from '../features/developer/JsonToCsvTool';
import CsvToJsonTool from '../features/developer/CsvToJsonTool';
import Base64EncoderTool from '../features/developer/Base64EncoderTool';
import Base64DecoderTool from '../features/developer/Base64DecoderTool';
import UrlEncoderTool from '../features/developer/UrlEncoderTool';
import UrlDecoderTool from '../features/developer/UrlDecoderTool';
import JwtDecoderTool from '../features/developer/JwtDecoderTool';
import UuidGeneratorTool from '../features/developer/UuidGeneratorTool';
import PasswordGeneratorTool from '../features/developer/PasswordGeneratorTool';
import HashGeneratorTool from '../features/developer/HashGeneratorTool';
import TimestampConverterTool from '../features/developer/TimestampConverterTool';
import RegexTesterTool from '../features/developer/RegexTesterTool';
import HtmlEncoderTool from '../features/developer/HtmlEncoderTool';
import MarkdownPreviewTool from '../features/developer/MarkdownPreviewTool';
import ColorConverterTool from '../features/developer/ColorConverterTool';
import CssMinifierTool from '../features/developer/CssMinifierTool';
import JavascriptMinifierTool from '../features/developer/JavascriptMinifierTool';
import SqlFormatterTool from '../features/developer/SqlFormatterTool';
import WordCounterTool from '../features/text/WordCounterTool';
import CharacterCounterTool from '../features/text/CharacterCounterTool';
import CaseConverterTool from '../features/text/CaseConverterTool';
import RemoveDuplicateLinesTool from '../features/text/RemoveDuplicateLinesTool';
import TextSorterTool from '../features/text/TextSorterTool';
import TextCleanerTool from '../features/text/TextCleanerTool';
import FindReplaceTool from '../features/text/FindReplaceTool';
import TextReverserTool from '../features/text/TextReverserTool';
import LoremIpsumTool from '../features/text/LoremIpsumTool';
import ReadingTimeTool from '../features/text/ReadingTimeTool';
import ImageCompressorTool from '../features/file/ImageCompressorTool';
import ImageResizerTool from '../features/file/ImageResizerTool';
import ImageCropperTool from '../features/file/ImageCropperTool';
import ImageConverterTool from '../features/file/ImageConverterTool';
import ImageToBase64Tool from '../features/file/ImageToBase64Tool';
import FileSizeConverterTool from '../features/file/FileSizeConverterTool';
import TextFileGeneratorTool from '../features/file/TextFileGeneratorTool';
import CsvGeneratorTool from '../features/file/CsvGeneratorTool';
import LengthConverterTool from '../features/converters/LengthConverterTool';
import WeightConverterTool from '../features/converters/WeightConverterTool';
import TemperatureConverterTool from '../features/converters/TemperatureConverterTool';
import AreaConverterTool from '../features/converters/AreaConverterTool';
import VolumeConverterTool from '../features/converters/VolumeConverterTool';
import SpeedConverterTool from '../features/converters/SpeedConverterTool';
import TimeConverterTool from '../features/converters/TimeConverterTool';
import DateDifferenceTool from '../features/everyday/DateDifferenceTool';
import DaysBetweenDatesTool from '../features/everyday/DaysBetweenDatesTool';
import CountdownTimerTool from '../features/everyday/CountdownTimerTool';
import StopwatchTool from '../features/everyday/StopwatchTool';
import RandomNumberGeneratorTool from '../features/everyday/RandomNumberGeneratorTool';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/:slug" element={<CategoryPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/tools/cgpa-calculator" element={<CgpaCalculatorTool />} />
          <Route path="/tools/gpa-calculator" element={<GpaCalculatorTool />} />
          <Route path="/tools/percentage-calculator" element={<PercentageCalculatorTool />} />
          <Route path="/tools/attendance-calculator" element={<AttendanceCalculatorTool />} />
          <Route path="/tools/bunk-calculator" element={<BunkCalculatorTool />} />
          <Route path="/tools/required-attendance-calculator" element={<RequiredAttendanceCalculatorTool />} />
          <Route path="/tools/exam-countdown" element={<ExamCountdownTool />} />
          <Route path="/tools/study-timer" element={<StudyTimerTool />} />
          <Route path="/tools/semester-planner" element={<SemesterPlannerTool />} />
          <Route path="/tools/grade-calculator" element={<GradeCalculatorTool />} />
          <Route path="/tools/marks-percentage-calculator" element={<MarksPercentageCalculatorTool />} />
          <Route path="/tools/sgpa-calculator" element={<SgpaCalculatorTool />} />
          <Route path="/tools/cgpa-to-percentage" element={<CgpaToPercentageTool />} />
          <Route path="/tools/percentage-to-cgpa" element={<PercentageToCgpaTool />} />
          <Route path="/tools/age-calculator" element={<AgeCalculatorTool />} />
          <Route path="/tools/ohms-law-calculator" element={<OhmsLawCalculatorTool />} />
          <Route path="/tools/resistor-calculator" element={<ResistorCalculatorTool />} />
          <Route path="/tools/resistor-color-code" element={<ResistorColorCodeTool />} />
          <Route path="/tools/series-resistor-calculator" element={<SeriesResistorCalculatorTool />} />
          <Route path="/tools/parallel-resistor-calculator" element={<ParallelResistorCalculatorTool />} />
          <Route path="/tools/voltage-divider-calculator" element={<VoltageDividerCalculatorTool />} />
          <Route path="/tools/current-divider-calculator" element={<CurrentDividerCalculatorTool />} />
          <Route path="/tools/led-resistor-calculator" element={<LedResistorCalculatorTool />} />
          <Route path="/tools/power-calculator" element={<PowerCalculatorTool />} />
          <Route path="/tools/capacitor-calculator" element={<CapacitorCalculatorTool />} />
          <Route path="/tools/capacitor-series-calculator" element={<CapacitorSeriesCalculatorTool />} />
          <Route path="/tools/capacitor-parallel-calculator" element={<CapacitorParallelCalculatorTool />} />
          <Route path="/tools/rc-time-constant" element={<RcTimeConstantTool />} />
          <Route path="/tools/rl-time-constant" element={<RlTimeConstantTool />} />
          <Route path="/tools/resonant-frequency" element={<ResonantFrequencyTool />} />
          <Route path="/tools/frequency-period" element={<FrequencyPeriodTool />} />
          <Route path="/tools/period-frequency" element={<PeriodFrequencyTool />} />
          <Route path="/tools/decibel-calculator" element={<DecibelCalculatorTool />} />
          <Route path="/tools/adc-resolution" element={<AdcResolutionTool />} />
          <Route path="/tools/dac-resolution" element={<DacResolutionTool />} />
          <Route path="/tools/pwm-calculator" element={<PwmCalculatorTool />} />
          <Route path="/tools/transformer-calculator" element={<TransformerCalculatorTool />} />
          <Route path="/tools/battery-runtime" element={<BatteryRuntimeTool />} />
          <Route path="/tools/opamp-calculator" element={<OpampCalculatorTool />} />
          <Route path="/tools/electrical-unit-converter" element={<ElectricalUnitConverterTool />} />
          <Route path="/tools/scientific-calculator" element={<ScientificCalculatorTool />} />
          <Route path="/tools/fraction-calculator" element={<FractionCalculatorTool />} />
          <Route path="/tools/ratio-calculator" element={<RatioCalculatorTool />} />
          <Route path="/tools/average-calculator" element={<AverageCalculatorTool />} />
          <Route path="/tools/standard-deviation" element={<StandardDeviationTool />} />
          <Route path="/tools/variance-calculator" element={<VarianceCalculatorTool />} />
          <Route path="/tools/quadratic-equation" element={<QuadraticEquationTool />} />
          <Route path="/tools/simple-interest" element={<SimpleInterestTool />} />
          <Route path="/tools/compound-interest" element={<CompoundInterestTool />} />
          <Route path="/tools/emi-calculator" element={<EmiCalculatorTool />} />
          <Route path="/tools/json-formatter" element={<JsonFormatterTool />} />
          <Route path="/tools/json-validator" element={<JsonValidatorTool />} />
          <Route path="/tools/json-to-csv" element={<JsonToCsvTool />} />
          <Route path="/tools/csv-to-json" element={<CsvToJsonTool />} />
          <Route path="/tools/base64-encoder" element={<Base64EncoderTool />} />
          <Route path="/tools/base64-decoder" element={<Base64DecoderTool />} />
          <Route path="/tools/url-encoder" element={<UrlEncoderTool />} />
          <Route path="/tools/url-decoder" element={<UrlDecoderTool />} />
          <Route path="/tools/jwt-decoder" element={<JwtDecoderTool />} />
          <Route path="/tools/uuid-generator" element={<UuidGeneratorTool />} />
          <Route path="/tools/password-generator" element={<PasswordGeneratorTool />} />
          <Route path="/tools/hash-generator" element={<HashGeneratorTool />} />
          <Route path="/tools/timestamp-converter" element={<TimestampConverterTool />} />
          <Route path="/tools/regex-tester" element={<RegexTesterTool />} />
          <Route path="/tools/html-encoder" element={<HtmlEncoderTool />} />
          <Route path="/tools/markdown-preview" element={<MarkdownPreviewTool />} />
          <Route path="/tools/color-converter" element={<ColorConverterTool />} />
          <Route path="/tools/css-minifier" element={<CssMinifierTool />} />
          <Route path="/tools/javascript-minifier" element={<JavascriptMinifierTool />} />
          <Route path="/tools/sql-formatter" element={<SqlFormatterTool />} />
          <Route path="/tools/word-counter" element={<WordCounterTool />} />
          <Route path="/tools/character-counter" element={<CharacterCounterTool />} />
          <Route path="/tools/case-converter" element={<CaseConverterTool />} />
          <Route path="/tools/remove-duplicate-lines" element={<RemoveDuplicateLinesTool />} />
          <Route path="/tools/text-sorter" element={<TextSorterTool />} />
          <Route path="/tools/text-cleaner" element={<TextCleanerTool />} />
          <Route path="/tools/find-replace" element={<FindReplaceTool />} />
          <Route path="/tools/text-reverser" element={<TextReverserTool />} />
          <Route path="/tools/lorem-ipsum" element={<LoremIpsumTool />} />
          <Route path="/tools/reading-time" element={<ReadingTimeTool />} />
          <Route path="/tools/image-compressor" element={<ImageCompressorTool />} />
          <Route path="/tools/image-resizer" element={<ImageResizerTool />} />
          <Route path="/tools/image-cropper" element={<ImageCropperTool />} />
          <Route path="/tools/image-converter" element={<ImageConverterTool />} />
          <Route path="/tools/image-to-base64" element={<ImageToBase64Tool />} />
          <Route path="/tools/file-size-converter" element={<FileSizeConverterTool />} />
          <Route path="/tools/text-file-generator" element={<TextFileGeneratorTool />} />
          <Route path="/tools/csv-generator" element={<CsvGeneratorTool />} />
          <Route path="/tools/length-converter" element={<LengthConverterTool />} />
          <Route path="/tools/weight-converter" element={<WeightConverterTool />} />
          <Route path="/tools/temperature-converter" element={<TemperatureConverterTool />} />
          <Route path="/tools/area-converter" element={<AreaConverterTool />} />
          <Route path="/tools/volume-converter" element={<VolumeConverterTool />} />
          <Route path="/tools/speed-converter" element={<SpeedConverterTool />} />
          <Route path="/tools/time-converter" element={<TimeConverterTool />} />
          <Route path="/tools/date-difference" element={<DateDifferenceTool />} />
          <Route path="/tools/days-between-dates" element={<DaysBetweenDatesTool />} />
          <Route path="/tools/countdown-timer" element={<CountdownTimerTool />} />
          <Route path="/tools/stopwatch" element={<StopwatchTool />} />
          <Route path="/tools/random-number-generator" element={<RandomNumberGeneratorTool />} />

        <Route path="/tool/timer-555-calculator" element={<Timer555CalculatorTool />} />
          <Route path="/tool/pcb-trace-width" element={<PcbTraceWidthTool />} />
          <Route path="/tool/voltage-drop-calculator" element={<VoltageDropCalculatorTool />} />
          <Route path="/tool/wire-gauge-converter" element={<WireGaugeConverterTool />} />
          <Route path="/tool/coaxial-impedance" element={<CoaxialImpedanceTool />} />
          <Route path="/tool/low-pass-filter" element={<LowPassFilterTool />} />
          <Route path="/tool/high-pass-filter" element={<HighPassFilterTool />} />
          <Route path="/tool/rlc-resonance" element={<RlcResonanceTool />} />
          <Route path="/tool/wavelength-frequency" element={<WavelengthFrequencyTool />} />
          <Route path="/tool/antenna-length" element={<AntennaLengthTool />} />
          <Route path="/tool/gear-ratio" element={<GearRatioTool />} />
          <Route path="/tool/torque-power" element={<TorquePowerTool />} />
          <Route path="/tool/hookes-law" element={<HookesLawTool />} />
          <Route path="/tool/area-moment-inertia" element={<AreaMomentInertiaTool />} />
          <Route path="/tool/spring-constant" element={<SpringConstantTool />} />
          <Route path="/tool/reynolds-number" element={<ReynoldsNumberTool />} />
          <Route path="/tool/flow-rate" element={<FlowRateTool />} />
          <Route path="/tool/beam-deflection" element={<BeamDeflectionTool />} />
          <Route path="/tool/kinetic-energy" element={<KineticEnergyTool />} />
          <Route path="/tool/potential-energy" element={<PotentialEnergyTool />} />
          <Route path="/tool/ideal-gas-law" element={<IdealGasLawTool />} />
          <Route path="/tool/specific-heat-capacity" element={<SpecificHeatCapacityTool />} />
          <Route path="/tool/heat-conduction" element={<HeatConductionTool />} />
          <Route path="/tool/pump-power" element={<PumpPowerTool />} />
          <Route path="/tool/buoyancy-force" element={<BuoyancyForceTool />} />
          <Route path="/tool/concrete-volume" element={<ConcreteVolumeTool />} />
          <Route path="/tool/rebar-weight" element={<RebarWeightTool />} />
          <Route path="/tool/column-buckling" element={<ColumnBucklingTool />} />
          <Route path="/tool/brick-estimator" element={<BrickEstimatorTool />} />
          <Route path="/tool/roof-pitch" element={<RoofPitchTool />} />
          <Route path="/tool/bmi-calculator" element={<BmiCalculatorTool />} />
          <Route path="/tool/tdee-calculator" element={<TdeeCalculatorTool />} />
          <Route path="/tool/one-rep-max" element={<OneRepMaxTool />} />
          <Route path="/tool/body-fat-calculator" element={<BodyFatCalculatorTool />} />
          <Route path="/tool/macro-calculator" element={<MacroCalculatorTool />} />
          <Route path="/tool/days-between-dates" element={<DaysBetweenDatesTool />} />
          <Route path="/tool/age-calculator" element={<AgeCalculatorTool />} />
          <Route path="/tool/business-days" element={<BusinessDaysTool />} />
          <Route path="/tool/unix-timestamp" element={<UnixTimestampTool />} />
          <Route path="/tool/time-calculator" element={<TimeCalculatorTool />} />
          <Route path="/tool/triangle-calculator" element={<TriangleCalculatorTool />} />
          <Route path="/tool/circle-calculator" element={<CircleCalculatorTool />} />
          <Route path="/tool/pythagorean-theorem" element={<PythagoreanTheoremTool />} />
          <Route path="/tool/percentage-calculator" element={<PercentageCalculatorTool />} />
          <Route path="/tool/percentage-change" element={<PercentageChangeTool />} />
          <Route path="/tool/mortgage-calculator" element={<MortgageCalculatorTool />} />
          <Route path="/tool/compound-interest" element={<CompoundInterestTool />} />
          <Route path="/tool/salary-calculator" element={<SalaryCalculatorTool />} />
          <Route path="/tool/roi-calculator" element={<RoiCalculatorTool />} />
          <Route path="/tool/tip-calculator" element={<TipCalculatorTool />} />
          <Route path="/tool/discount-calculator" element={<DiscountCalculatorTool />} />
          <Route path="/tool/auto-loan" element={<AutoLoanTool />} />
          <Route path="/tool/profit-margin" element={<ProfitMarginTool />} />
          <Route path="/tool/inflation-calculator" element={<InflationCalculatorTool />} />
          <Route path="/tool/vat-calculator" element={<VatCalculatorTool />} />
          <Route path="/tool/subnet-calculator" element={<SubnetCalculatorTool />} />
          <Route path="/tool/bandwidth-calculator" element={<BandwidthCalculatorTool />} />
          <Route path="/tool/mac-generator" element={<MacGeneratorTool />} />
          <Route path="/tool/chmod-calculator" element={<ChmodCalculatorTool />} />
          <Route path="/tool/data-unit-converter" element={<DataUnitConverterTool />} />
          <Route path="/tool/url-encoder" element={<UrlEncoderTool />} />
          <Route path="/tool/base64-converter" element={<Base64ConverterTool />} />
          <Route path="/tool/jwt-decoder" element={<JwtDecoderTool />} />
          <Route path="/tool/password-generator" element={<PasswordGeneratorTool />} />
          <Route path="/tool/ipv4-to-ipv6" element={<Ipv4ToIpv6Tool />} />
          <Route path="/tool/json-formatter" element={<JsonFormatterTool />} />
          <Route path="/tool/json-validator" element={<JsonValidatorTool />} />
          <Route path="/tool/json-to-csv" element={<JsonToCsvTool />} />
          <Route path="/tool/csv-to-json" element={<CsvToJsonTool />} />
          <Route path="/tool/base64-encoder" element={<Base64EncoderTool />} />
          <Route path="/tool/base64-decoder" element={<Base64DecoderTool />} />
          <Route path="/tool/url-decoder" element={<UrlDecoderTool />} />
          <Route path="/tool/uuid-generator" element={<UuidGeneratorTool />} />
          <Route path="/tool/hash-generator" element={<HashGeneratorTool />} />
          <Route path="/tool/timestamp-converter" element={<TimestampConverterTool />} />
          <Route path="/tool/regex-tester" element={<RegexTesterTool />} />
          <Route path="/tool/html-encoder" element={<HtmlEncoderTool />} />
          <Route path="/tool/markdown-preview" element={<MarkdownPreviewTool />} />
          <Route path="/tool/color-converter" element={<ColorConverterTool />} />
          <Route path="/tool/css-minifier" element={<CssMinifierTool />} />
          <Route path="/tool/javascript-minifier" element={<JavascriptMinifierTool />} />
          <Route path="/tool/sql-formatter" element={<SqlFormatterTool />} />
          <Route path="/tool/cgpa-calculator" element={<CgpaCalculatorTool />} />
          <Route path="/tool/gpa-calculator" element={<GpaCalculatorTool />} />
          <Route path="/tool/attendance-calculator" element={<AttendanceCalculatorTool />} />
          <Route path="/tool/bunk-calculator" element={<BunkCalculatorTool />} />
          <Route path="/tool/required-attendance-calculator" element={<RequiredAttendanceCalculatorTool />} />
          <Route path="/tool/exam-countdown" element={<ExamCountdownTool />} />
          <Route path="/tool/study-timer" element={<StudyTimerTool />} />
          <Route path="/tool/semester-planner" element={<SemesterPlannerTool />} />
          <Route path="/tool/grade-calculator" element={<GradeCalculatorTool />} />
          <Route path="/tool/marks-percentage-calculator" element={<MarksPercentageCalculatorTool />} />
          <Route path="/tool/sgpa-calculator" element={<SgpaCalculatorTool />} />
          <Route path="/tool/cgpa-to-percentage" element={<CgpaToPercentageTool />} />
          <Route path="/tool/percentage-to-cgpa" element={<PercentageToCgpaTool />} />
          <Route path="/tool/image-compressor" element={<ImageCompressorTool />} />
          <Route path="/tool/image-resizer" element={<ImageResizerTool />} />
          <Route path="/tool/image-cropper" element={<ImageCropperTool />} />
          <Route path="/tool/image-converter" element={<ImageConverterTool />} />
          <Route path="/tool/image-to-base64" element={<ImageToBase64Tool />} />
          <Route path="/tool/file-size-converter" element={<FileSizeConverterTool />} />
          <Route path="/tool/text-file-generator" element={<TextFileGeneratorTool />} />
          <Route path="/tool/csv-generator" element={<CsvGeneratorTool />} />
          <Route path="/tool/word-counter" element={<WordCounterTool />} />
          <Route path="/tool/character-counter" element={<CharacterCounterTool />} />
          <Route path="/tool/case-converter" element={<CaseConverterTool />} />
          <Route path="/tool/remove-duplicate-lines" element={<RemoveDuplicateLinesTool />} />
          <Route path="/tool/text-sorter" element={<TextSorterTool />} />
          <Route path="/tool/text-cleaner" element={<TextCleanerTool />} />
          <Route path="/tool/find-replace" element={<FindReplaceTool />} />
          <Route path="/tool/text-reverser" element={<TextReverserTool />} />
          <Route path="/tool/lorem-ipsum" element={<LoremIpsumTool />} />
          <Route path="/tool/reading-time" element={<ReadingTimeTool />} />
          <Route path="/tool/ohms-law-calculator" element={<OhmsLawCalculatorTool />} />
          <Route path="/tool/resistor-calculator" element={<ResistorCalculatorTool />} />
          <Route path="/tool/resistor-color-code" element={<ResistorColorCodeTool />} />
          <Route path="/tool/series-resistor-calculator" element={<SeriesResistorCalculatorTool />} />
          <Route path="/tool/parallel-resistor-calculator" element={<ParallelResistorCalculatorTool />} />
          <Route path="/tool/voltage-divider-calculator" element={<VoltageDividerCalculatorTool />} />
          <Route path="/tool/current-divider-calculator" element={<CurrentDividerCalculatorTool />} />
          <Route path="/tool/led-resistor-calculator" element={<LedResistorCalculatorTool />} />
          <Route path="/tool/power-calculator" element={<PowerCalculatorTool />} />
          <Route path="/tool/capacitor-calculator" element={<CapacitorCalculatorTool />} />
          <Route path="/tool/capacitor-series-calculator" element={<CapacitorSeriesCalculatorTool />} />
          <Route path="/tool/capacitor-parallel-calculator" element={<CapacitorParallelCalculatorTool />} />
          <Route path="/tool/rc-time-constant" element={<RcTimeConstantTool />} />
          <Route path="/tool/rl-time-constant" element={<RlTimeConstantTool />} />
          <Route path="/tool/resonant-frequency" element={<ResonantFrequencyTool />} />
          <Route path="/tool/frequency-period" element={<FrequencyPeriodTool />} />
          <Route path="/tool/period-frequency" element={<PeriodFrequencyTool />} />
          <Route path="/tool/decibel-calculator" element={<DecibelCalculatorTool />} />
          <Route path="/tool/adc-resolution" element={<AdcResolutionTool />} />
          <Route path="/tool/dac-resolution" element={<DacResolutionTool />} />
          <Route path="/tool/pwm-calculator" element={<PwmCalculatorTool />} />
          <Route path="/tool/transformer-calculator" element={<TransformerCalculatorTool />} />
          <Route path="/tool/battery-runtime" element={<BatteryRuntimeTool />} />
          <Route path="/tool/opamp-calculator" element={<OpampCalculatorTool />} />
          <Route path="/tool/electrical-unit-converter" element={<ElectricalUnitConverterTool />} />
          <Route path="/tool/scientific-calculator" element={<ScientificCalculatorTool />} />
          <Route path="/tool/fraction-calculator" element={<FractionCalculatorTool />} />
          <Route path="/tool/ratio-calculator" element={<RatioCalculatorTool />} />
          <Route path="/tool/average-calculator" element={<AverageCalculatorTool />} />
          <Route path="/tool/standard-deviation" element={<StandardDeviationTool />} />
          <Route path="/tool/variance-calculator" element={<VarianceCalculatorTool />} />
          <Route path="/tool/quadratic-equation" element={<QuadraticEquationTool />} />
          <Route path="/tool/simple-interest" element={<SimpleInterestTool />} />
          <Route path="/tool/emi-calculator" element={<EmiCalculatorTool />} />
          <Route path="/tool/length-converter" element={<LengthConverterTool />} />
          <Route path="/tool/weight-converter" element={<WeightConverterTool />} />
          <Route path="/tool/temperature-converter" element={<TemperatureConverterTool />} />
          <Route path="/tool/area-converter" element={<AreaConverterTool />} />
          <Route path="/tool/volume-converter" element={<VolumeConverterTool />} />
          <Route path="/tool/speed-converter" element={<SpeedConverterTool />} />
          <Route path="/tool/time-converter" element={<TimeConverterTool />} />
          <Route path="/tool/date-difference" element={<DateDifferenceTool />} />
          <Route path="/tool/countdown-timer" element={<CountdownTimerTool />} />
          <Route path="/tool/stopwatch" element={<StopwatchTool />} />
          <Route path="/tool/random-number-generator" element={<RandomNumberGeneratorTool />} />
          <Route path="/tools/timer-555-calculator" element={<Timer555CalculatorTool />} />
          <Route path="/tools/pcb-trace-width" element={<PcbTraceWidthTool />} />
          <Route path="/tools/voltage-drop-calculator" element={<VoltageDropCalculatorTool />} />
          <Route path="/tools/wire-gauge-converter" element={<WireGaugeConverterTool />} />
          <Route path="/tools/coaxial-impedance" element={<CoaxialImpedanceTool />} />
          <Route path="/tools/low-pass-filter" element={<LowPassFilterTool />} />
          <Route path="/tools/high-pass-filter" element={<HighPassFilterTool />} />
          <Route path="/tools/rlc-resonance" element={<RlcResonanceTool />} />
          <Route path="/tools/wavelength-frequency" element={<WavelengthFrequencyTool />} />
          <Route path="/tools/antenna-length" element={<AntennaLengthTool />} />
          <Route path="/tools/gear-ratio" element={<GearRatioTool />} />
          <Route path="/tools/torque-power" element={<TorquePowerTool />} />
          <Route path="/tools/hookes-law" element={<HookesLawTool />} />
          <Route path="/tools/area-moment-inertia" element={<AreaMomentInertiaTool />} />
          <Route path="/tools/spring-constant" element={<SpringConstantTool />} />
          <Route path="/tools/reynolds-number" element={<ReynoldsNumberTool />} />
          <Route path="/tools/flow-rate" element={<FlowRateTool />} />
          <Route path="/tools/beam-deflection" element={<BeamDeflectionTool />} />
          <Route path="/tools/kinetic-energy" element={<KineticEnergyTool />} />
          <Route path="/tools/potential-energy" element={<PotentialEnergyTool />} />
          <Route path="/tools/ideal-gas-law" element={<IdealGasLawTool />} />
          <Route path="/tools/specific-heat-capacity" element={<SpecificHeatCapacityTool />} />
          <Route path="/tools/heat-conduction" element={<HeatConductionTool />} />
          <Route path="/tools/pump-power" element={<PumpPowerTool />} />
          <Route path="/tools/buoyancy-force" element={<BuoyancyForceTool />} />
          <Route path="/tools/concrete-volume" element={<ConcreteVolumeTool />} />
          <Route path="/tools/rebar-weight" element={<RebarWeightTool />} />
          <Route path="/tools/column-buckling" element={<ColumnBucklingTool />} />
          <Route path="/tools/brick-estimator" element={<BrickEstimatorTool />} />
          <Route path="/tools/roof-pitch" element={<RoofPitchTool />} />
          <Route path="/tools/bmi-calculator" element={<BmiCalculatorTool />} />
          <Route path="/tools/tdee-calculator" element={<TdeeCalculatorTool />} />
          <Route path="/tools/one-rep-max" element={<OneRepMaxTool />} />
          <Route path="/tools/body-fat-calculator" element={<BodyFatCalculatorTool />} />
          <Route path="/tools/macro-calculator" element={<MacroCalculatorTool />} />
          <Route path="/tools/business-days" element={<BusinessDaysTool />} />
          <Route path="/tools/unix-timestamp" element={<UnixTimestampTool />} />
          <Route path="/tools/time-calculator" element={<TimeCalculatorTool />} />
          <Route path="/tools/triangle-calculator" element={<TriangleCalculatorTool />} />
          <Route path="/tools/circle-calculator" element={<CircleCalculatorTool />} />
          <Route path="/tools/pythagorean-theorem" element={<PythagoreanTheoremTool />} />
          <Route path="/tools/percentage-change" element={<PercentageChangeTool />} />
          <Route path="/tools/mortgage-calculator" element={<MortgageCalculatorTool />} />
          <Route path="/tools/salary-calculator" element={<SalaryCalculatorTool />} />
          <Route path="/tools/roi-calculator" element={<RoiCalculatorTool />} />
          <Route path="/tools/tip-calculator" element={<TipCalculatorTool />} />
          <Route path="/tools/discount-calculator" element={<DiscountCalculatorTool />} />
          <Route path="/tools/auto-loan" element={<AutoLoanTool />} />
          <Route path="/tools/profit-margin" element={<ProfitMarginTool />} />
          <Route path="/tools/inflation-calculator" element={<InflationCalculatorTool />} />
          <Route path="/tools/vat-calculator" element={<VatCalculatorTool />} />
          <Route path="/tools/subnet-calculator" element={<SubnetCalculatorTool />} />
          <Route path="/tools/bandwidth-calculator" element={<BandwidthCalculatorTool />} />
          <Route path="/tools/mac-generator" element={<MacGeneratorTool />} />
          <Route path="/tools/chmod-calculator" element={<ChmodCalculatorTool />} />
          <Route path="/tools/data-unit-converter" element={<DataUnitConverterTool />} />
          <Route path="/tools/base64-converter" element={<Base64ConverterTool />} />
          <Route path="/tools/ipv4-to-ipv6" element={<Ipv4ToIpv6Tool />} />
        <Route path="*" element={<ToolNotFound />} />
    </Routes>
  );
}
