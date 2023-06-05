use swc_core::plugin::errors::HANDLER;
use swc_core::common::Span;
use tracing::error;

pub fn display_error(span: Span, message: &str) {
  error!(message);

  HANDLER.with(|handler| handler.span_err(span, message));
}

pub const NT_CONTROL_FLOW: &str = "@narrative/control-flow";

pub const IF: &str = "If";

pub const ELSE_IF: &str = "ElseIf";

pub const ELSE: &str = "Else";

pub const WHEN: &str = "when";

pub const SWITCH: &str = "Switch";

pub const CASE: &str = "Case";

pub const DEFAULT: &str = "Default";

pub const VALUE: &str = "value";

pub const IS: &str = "is";

pub const IN: &str = "in";

pub const FOR: &str = "For";

/// ```tsx
///
/// <div>
///   <For of={[1, 2, 3]}>
///     {(item, { index, isFirst, isLast }) => <i key={index}>{item}</i>}
///     <Empty>No Data</Empty>
///   </For>
/// </div>
///
/// ↓ ↓ ↓ ↓ ↓ ↓
///
/// <div>
///   {(__arr => {
///     if (__arr?.length) {
///       return __arr.map((item, index, arr) => {
///         const length = arr.length;
///         const isFirst = index === 0;
///         const isLast = index === length - 1;
///         return <i key={index}>{item}</i>;
///       }, this);
///     }
///
///     return 'No Data';
///   })([1, 2, 3])}
/// </div>
/// ```
pub const EMPTY: &str = "Empty";

/// ```tsx
///
/// <div>
///   <For of={[1, 2, 3]}>
///     {(item, { index, isFirst, isLast }) => <i key={index}>{item}</i>}
///   </For>
/// </div>
///
/// ↓ ↓ ↓ ↓ ↓ ↓
///
/// <div>
///   {[1, 2, 3]?.map((item, index, arr) => {
///     const length = arr.length;
///     const isFirst = index === 0;
///     const isLast = index === length - 1;
///     return <i key={index}>{item}</i>;
///   }, this) || null}
/// </div>
/// ```
pub const OF: &str = "of";

/// ```tsx
///
/// <div>
///   <For in={{ a: 1, b: 2, c: 3 }}>
///     {(item, { key }) => <i key={key}>{item}</i>}
///     <Empty>No Data</Empty>
///   </For>
/// </div>
///
/// ↓ ↓ ↓ ↓ ↓ ↓
///
/// <div>
///   {(__obj => {
///     const __keys = __obj ? Object.keys(__obj) : [];
///
///     if (__keys.length) {
///       return __keys.map((key, index, arr) => {
///         const item = __obj[key];
///         const length = arr.length;
///         const isFirst = index === 0;
///         const isLast = index === length - 1;
///         return <i key={key}>{item}</i>;
///       }, this);
///     }
///
///     return 'No Data';
///   })({ a: 1, b: 2, c: 3 })}
/// </div>
/// ```
pub const FOR_IN: &str = "in";

pub const ARR_PARAM: &str = "__arr";

pub const OBJ_PARAM: &str = "__obj";

pub const KEYS_PARAM: &str = "__keys";