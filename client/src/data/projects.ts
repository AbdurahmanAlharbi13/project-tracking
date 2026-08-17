/**
 *  — بيانات المصدر المستخرجة من ملف Excel المرفق.
 */
export type ProjectStatus = "مكتمل" | "قيد التنفيذ" | "لم يبدأ";

export type Project = {
  id: string;
  name: string;
  team: string;
  startDate: string;
  plannedEndDate: string;
  actualEndDate: string;
  status: ProjectStatus;
  completion: number | null;
  challenges: string;
  notes: string;
};

export type Task = {
  id: string;
  projectId: string;
  name: string;
  team: string;
  status: ProjectStatus;
  completion: number | null;
  priority: string;
  notes: string;
};

export const projects: Project[] = [
  {
    "id": "MFS-01",
    "name": "الإستخراج الأولي لميزان المراجعة للمركز الرئيس 2025",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "مكتمل",
    "completion": 100,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-02",
    "name": "تصدير ميزان المراجعة في موارد الصحية لمدينة الجبيل وينبع ( 5 مراحل )",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 10,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-03",
    "name": "انشاء وتهيئة وحدات مخصصة لصناديق دعم خدمات المدينة ( 4 صناديق )",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 3,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-04",
    "name": "انشاء وتهيئة وحدات مخصصة لصناديق التعليم ( 6 صناديق )",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 10,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-05",
    "name": "إغلاق الفترات لمسيرات الرواتب",
    "team": "الفريق التقني",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "مكتمل",
    "completion": 100,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-06",
    "name": "يوجد العديد من حركات المخزون يتم تقييمها بدون مراجعة المرفقات وإضافتها  بالمستودعات مما يسبب مشاكل مع المراجع الخارجي",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "مكتمل",
    "completion": 100,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-07",
    "name": "يتم الغاء بعض الاستلامات بعد اعداد فواتير لها وبالتالي قد يؤدي الى ترحيل التكاليف بصورة خاطئة.",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "مكتمل",
    "completion": 100,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-08",
    "name": "عدم تفعيل المطابقات البنكية على النظام أو مطابقات أوامر الدفع بطريقة آلية.",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "لم يبدأ",
    "completion": 0,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-09",
    "name": "ايراد الموازنة يتم الاعتراف بها يدويا وليس آليا مما قد يؤدي لحدوث اخطاء.",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 10,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-10",
    "name": "لا يوجد ربط بين مسيرات الرواتب واوامر الدفع يؤدي إلى العديد من الاخطاء في اوامر الصرف من حيث المبالغ وغيره",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 40,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-11",
    "name": "عدم تفعيل الية تسجيل المصروفات المدفوعة مقدما وبالتالي استنفاذ المصروف المدفوع مقدم.",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "لم يبدأ",
    "completion": 0,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-12",
    "name": "اقفال الفترات المحاسبية الخاصة بسجلات الأصول المحاسبية",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 25,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-13",
    "name": "الأرصدة الافتتاحية الخاصة بالأصول",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "لم يبدأ",
    "completion": 0,
    "challenges": "لم يبدأ العمل على الأرصدة الافتتاحية بعد",
    "notes": ""
  },
  {
    "id": "MFS-14",
    "name": "تهيئة الحل الخاص باسترداد ضريبة القيمة المضافة على نظام موارد.",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 60,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-15",
    "name": "مراجعة العقود الخاصة بالإيجار التشغيلي والتمويلي",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 90,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-16",
    "name": "رفع الأرصدة الإفتتاحية",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "لم يبدأ",
    "completion": 0,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-17",
    "name": "مطابقة أرصدة الحسابات الفرعية المساعدة في النظام مع إجمالي الحسابات في الأستاذ العام",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "لم يبدأ",
    "completion": 0,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-18",
    "name": "إلغاء الحساب الطبيعي 000000000",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 90,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-19",
    "name": "عناصر رواتب غير مربوطة بتكاليف وغير مستخدمة(غير مصنفة)",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "مكتمل",
    "completion": 100,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-20",
    "name": "الإستخراج الأولي لميزان المراجعة للهيئة الملكية للجبيل وينبع لجميع المدن",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "لم يبدأ",
    "completion": 0,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-21",
    "name": "معالجة الحركات التاريخية للمدفوعات واغلاق الفترات التاريخية",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 10,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-22",
    "name": "معالجة إشكالية تحديد تاريخ الغاء فواتير المدفوعات",
    "team": "الفريق المالي التقني",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "مكتمل",
    "completion": 100,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-23",
    "name": "معالجة تأثير مناقلات الأصول على مركز تكلفة إدارة المستودعات فيما يخص الحركات المخزنية",
    "team": "الفريق المالي التقني",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 70,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-24",
    "name": "بدء تشغيل وتفعيل نظام موارد الصحية الجبيل",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 80,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-25",
    "name": "بدء تشغيل وتفعيل نظام موارد الصحية ينبع",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 50,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-26",
    "name": "تهيئة العمليات المالية وفحص ومراقبة البيانات",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "قيد التنفيذ",
    "completion": 20,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-27",
    "name": "الإعداد الأولي لميزان المراجعة",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "لم يبدأ",
    "completion": 0,
    "challenges": "",
    "notes": ""
  },
  {
    "id": "MFS-28",
    "name": "الربط التقني بين نظام موارد الهيئة والصحية",
    "team": "الفريق التقني/الفريق المالي",
    "startDate": "",
    "plannedEndDate": "",
    "actualEndDate": "",
    "status": "لم يبدأ",
    "completion": 0,
    "challenges": "",
    "notes": ""
  }
];

export const tasks: Task[] = [
  {
    "id": "TASK-01",
    "projectId": "MFS-18",
    "name": "حصر المشاكل المتوقعة نتيجة اغلاق الحساب الطبيعي اصفار",
    "team": "الفريق التقني/الفريق المالي",
    "status": "مكتمل",
    "completion": 100,
    "priority": "",
    "notes": ""
  },
  {
    "id": "TASK-02",
    "projectId": "MFS-18",
    "name": "وضع خطة عمل لاغلاق الحساب الطبيعي اصفار",
    "team": "الفريق التقني/الفريق المالي",
    "status": "مكتمل",
    "completion": 100,
    "priority": "",
    "notes": ""
  },
  {
    "id": "TASK-03",
    "projectId": "MFS-18",
    "name": "حصر جميع الدفعات المقدمة الغير مطبقة بالكامل ومرتبطة بالحساب اصفار وارسالها الى إدارة الحسابات",
    "team": "الفريق التقني/الفريق المالي",
    "status": "مكتمل",
    "completion": 100,
    "priority": "",
    "notes": ""
  },
  {
    "id": "TASK-04",
    "projectId": "MFS-18",
    "name": "عقد ورش عمل لايجاد حل بديل لتعديل التوجية المحاسبي للدفعات المقدمة اصفار",
    "team": "الفريق التقني/الفريق المالي",
    "status": "مكتمل",
    "completion": 100,
    "priority": "",
    "notes": ""
  },
  {
    "id": "TASK-05",
    "projectId": "MFS-18",
    "name": "عقد ورش عمل لعرض الحل البديل لتعديل التوجية المحاسبي للدفعات المقدمة اصفار",
    "team": "الفريق التقني/الفريق المالي",
    "status": "مكتمل",
    "completion": 100,
    "priority": "",
    "notes": ""
  },
  {
    "id": "TASK-06",
    "projectId": "MFS-18",
    "name": "عقد ورشة للزملاء في إدارة المالية والميزانية لتوضيح آلية العمل المستقبلية بعد اغلاق الحساب اصفار",
    "team": "الفريق التقني/الفريق المالي",
    "status": "مكتمل",
    "completion": 100,
    "priority": "",
    "notes": ""
  },
  {
    "id": "TASK-07",
    "projectId": "MFS-18",
    "name": "تم الاتفاق على وضع تاريخ نهاية لاستخدام الحساب الطبيعي اصفار بنهاية شهر يونيو",
    "team": "الفريق التقني/الفريق المالي",
    "status": "مكتمل",
    "completion": 100,
    "priority": "",
    "notes": ""
  },
  {
    "id": "TASK-08",
    "projectId": "MFS-18",
    "name": "حصر مجموعات التوزيع المرتبطة بحساب طبيعي اصفار وارسالها الى إدارة الحسابات للمراجعة والتعديل",
    "team": "الفريق التقني/الفريق المالي",
    "status": "مكتمل",
    "completion": 100,
    "priority": "",
    "notes": ""
  }
];
