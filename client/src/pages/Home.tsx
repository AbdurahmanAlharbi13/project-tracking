/**
 * غرفة القيادة المالية — صفحة لوحة قيادة تنفيذية عربية.
 * الاتجاه: كحلي مؤسسي + سطح عاجي تحريري + أزرق معدني، مع فلاتر مباشرة وبطاقات حالة قابلة للاختيار.
 */
import { useMemo, useState, type CSSProperties } from "react";
import {
  AlertTriangle,
  ArrowUpLeft,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  CircleDashed,
  Filter,
  Layers3,
  ListFilter,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projects, tasks, type Project, type ProjectStatus } from "@/data/projects";

type StatusFilter = ProjectStatus | "الكل";

const statusOrder: ProjectStatus[] = ["مكتمل", "قيد التنفيذ", "لم يبدأ"];

const statusMeta: Record<
  ProjectStatus,
  { label: string; accent: string; soft: string; icon: typeof CheckCircle2; hint: string }
> = {
  مكتمل: {
    label: "المشاريع المكتملة",
    accent: "#16846D",
    soft: "#E6F4EE",
    icon: CheckCircle2,
    hint: "إغلاق مؤكد — لا إجراء فوري",
  },
  "قيد التنفيذ": {
    label: "قيد التنفيذ",
    accent: "#2A6FBA",
    soft: "#E9F1FB",
    icon: CircleDashed,
    hint: "تحتاج توجيه ومتابعة تنفيذية",
  },
  "لم يبدأ": {
    label: "لم تبدأ",
    accent: "#C48628",
    soft: "#FFF4DC",
    icon: AlertTriangle,
    hint: "بانتظار انطلاق أو اعتماد قرار البدء",
  },
};

const formatProjectName = (name: string, max = 38) =>
  name.length > max ? `${name.slice(0, max)}…` : name;

const hasChallenge = (project: Project) =>
  `${project.challenges} ${project.notes}`.includes("تحدي");

export default function Home() {
  const [team, setTeam] = useState("الكل");
  const [projectId, setProjectId] = useState("الكل");
  const [status, setStatus] = useState<StatusFilter>("الكل");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const teams = useMemo(
    () => ["الكل", ...Array.from(new Set(projects.map((project) => project.team))).sort()],
    [],
  );

  const selectableProjects = useMemo(() => {
    const source = team === "الكل" ? projects : projects.filter((project) => project.team === team);
    return ["الكل", ...source.map((project) => project.id)];
  }, [team]);

  const scopeProjects = useMemo(
    () =>
      projects.filter(
        (project) =>
          (team === "الكل" || project.team === team) &&
          (projectId === "الكل" || project.id === projectId),
      ),
    [team, projectId],
  );

  const visibleProjects = useMemo(
    () => (status === "الكل" ? scopeProjects : scopeProjects.filter((project) => project.status === status)),
    [scopeProjects, status],
  );

  const visibleTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          (team === "الكل" || task.team === team) &&
          (projectId === "الكل" || task.projectId === projectId) &&
          (status === "الكل" || task.status === status),
      ),
    [team, projectId, status],
  );

  const statusCounts = useMemo(
    () =>
      statusOrder.map((item) => ({
        status: item,
        count: scopeProjects.filter((project) => project.status === item).length,
        ...statusMeta[item],
      })),
    [scopeProjects],
  );

  const completionValues = visibleProjects.flatMap((project) =>
    project.completion === null ? [] : [project.completion],
  );
  const averageCompletion = completionValues.length
    ? Math.round(completionValues.reduce((total, value) => total + value, 0) / completionValues.length)
    : 0;
  const activeCount = visibleProjects.filter((project) => project.status === "قيد التنفيذ").length;
  const challengeCount = visibleProjects.filter(hasChallenge).length;
  const completedTasks = visibleTasks.filter((task) => task.status === "مكتمل").length;

  const topProjects = useMemo(
    () =>
      [...visibleProjects]
        .filter((project) => project.completion !== null)
        .sort((first, second) => (second.completion ?? 0) - (first.completion ?? 0))
        .slice(0, 6)
        .map((project) => ({
          name: formatProjectName(project.name, 25),
          completion: project.completion ?? 0,
          status: project.status,
        })),
    [visibleProjects],
  );

  const statusChartData = statusCounts.map((item) => ({
    name: item.status,
    value: item.count,
    color: item.accent,
  }));

  const selectedProjectName =
    projectId === "الكل" ? "كل المشاريع" : projects.find((project) => project.id === projectId)?.name ?? "كل المشاريع";

  const decisionTitle =
    visibleProjects.length === 0
      ? "لا توجد مشاريع ضمن النطاق المختار"
      : activeCount > 0
        ? `قيد التنفيذ — ${activeCount} مشروعاً يحتاج متابعة`
        : status === "مكتمل"
          ? "النطاق المختار مكتمل"
          : "النطاق المختار بانتظار البدء";
  const decisionDetail =
    challengeCount > 0
      ? `${challengeCount} تنبيه مسجل يحتاج مراجعة قبل الانتقال للقرار التالي.`
      : "لوحة متابعة تنفيذ مشروع ميزان المراجعة، مع عرض الحالة ونسب الإنجاز والإجراءات المطلوبة";

  const resetFilters = () => {
    setTeam("الكل");
    setProjectId("الكل");
    setStatus("الكل");
  };

  return (
    <main dir="rtl" className="command-shell min-h-screen text-slate-900">
      <aside className="command-sidebar">
        <div className="sidebar-hero" />
        <div className="relative z-10 flex h-full flex-col p-5 lg:p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6">
            <div className="logo-shell">
              <img src="/logo.png" alt="رمز لوحة متابعة المشروع"/>
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-blue-200">الهيئة الملكية للجبيل وينبع</p>
              <h1 className="mt-1 text-base font-semibold text-white">ضبط أرصدة ميزان المراجعة</h1>
            </div>
          </div>

          <section className="mt-8" aria-labelledby="sidebar-status-heading">
            <p id="sidebar-status-heading" className="sidebar-label">حالة النطاق الحالي</p>
            <div className="mt-3 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm">
              <div className="relative grid h-14 w-14 place-items-center rounded-full border-[5px] border-sky-300/80 text-lg font-semibold text-white">
                {averageCompletion}%
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {visibleProjects.length === 0
                    ? "لا توجد نتائج"
                    : activeCount > 0
                      ? "تنفيذ مستمر"
                      : status === "مكتمل"
                        ? "نطاق مكتمل"
                        : "يتطلب بدءاً"}
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-100/70">متوسط الإنجاز ضمن الفلاتر المحددة</p>
              </div>
            </div>
          </section>

          <section className="mt-8" aria-labelledby="quick-status-heading">
            <div className="flex items-center justify-between">
              <p id="quick-status-heading" className="sidebar-label">اختيار سريع للحالة</p>
              <ListFilter className="h-4 w-4 text-blue-200" />
            </div>
            <div className="mt-3 space-y-2">
              {statusCounts.map((item) => {
                const Icon = item.icon;
                const selected = status === item.status;
                return (
                  <button
                    key={item.status}
                    type="button"
                    onClick={() => setStatus(selected ? "الكل" : item.status)}
                    className={`status-rail-item ${selected ? "is-selected" : ""}`}
                    style={{ "--status-color": item.accent } as CSSProperties}
                    aria-pressed={selected}
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-right text-sm">{item.status}</span>
                    <span className="status-rail-count">{item.count}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="mt-auto rounded-2xl border border-white/10 bg-[#0a2e46]/80 p-4">

            <p className="text-xs font-semibold text-blue-100">مشروع ضبط أرصدة ميزان المراجعة</p>
            <p className="mt-1 text-xs leading-5 text-blue-100/60">
            اطّلع على الحالة العامة للمشروع، ثم استعرض تفاصيل المشاريع التي تتطلب قرارًا أو متابعة.
            </p>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="workspace-header">
          <div className="decision-brief">
            <span className="decision-scan-line" />
            <div className="decision-copy">
              <div className="section-kicker"><span /> ضبـط أرصدة ميزان المراجعة للهيئة الملكية وفـق الاستحقاق المحاسبي</div>
              <h2>{decisionTitle}</h2>
              <p>{decisionDetail}</p>
            </div>
            <div className="decision-facts">
              <div><span>النطاق</span><strong>{visibleProjects.length}</strong><small>مشروع ظاهر</small></div>
              <div><span>الإنجاز</span><strong>{averageCompletion}%</strong><small>نسبة الإنجاز</small></div>
            </div>
          </div>
          <div className="header-signal">
            <span className="signal-dot" />
            آخر تحديث لحالة المشروع
          </div>
        </header>

        <section className="filter-bar" aria-label="فلاتر لوحة التحكم">
          <div className="filter-intro">
            <Filter className="h-4 w-4" />
            <span>تضييق النطاق</span>
          </div>
          <div className="filter-control">
            <span>الفريق</span>
            <Select
              value={team}
              onValueChange={(value) => {
                setTeam(value);
                setProjectId("الكل");
              }}
            >
              <SelectTrigger aria-label="اختيار الفريق" className="h-10 border-0 bg-transparent px-0 shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent dir="rtl" className="max-w-[22rem] bg-white text-slate-900">
                {teams.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="filter-control filter-project">
            <span>المشروع</span>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger aria-label="اختيار المشروع" className="h-10 border-0 bg-transparent px-0 shadow-none focus:ring-0">
                <SelectValue>{formatProjectName(selectedProjectName, 28)}</SelectValue>
              </SelectTrigger>
              <SelectContent dir="rtl" className="max-w-[22rem] bg-white text-slate-900">
                {selectableProjects.map((id) => (
                  <SelectItem key={id} value={id}>
                    {id === "الكل" ? "كل المشاريع" : `${id} — ${formatProjectName(projects.find((project) => project.id === id)?.name ?? "", 42)}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="filter-control filter-status">
            <span>الحالة</span>
            <Select value={status} onValueChange={(value) => setStatus(value as StatusFilter)}>
              <SelectTrigger aria-label="اختيار الحالة" className="h-10 border-0 bg-transparent px-0 shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent dir="rtl" className="bg-white text-slate-900">
                <SelectItem value="الكل">كل الحالات</SelectItem>
                {statusOrder.map((item) => (
                  <SelectItem key={item} value={item}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button type="button" onClick={resetFilters} className="reset-button" aria-label="إعادة ضبط الفلاتر">
            <RotateCcw className="h-4 w-4" />
            <span>إعادة ضبط</span>
          </button>
        </section>

        <section className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4" aria-label="المؤشرات الرئيسية">
          <MetricCard label="إجمالي المشاريع" value={visibleProjects.length} note="إجمالي المشاريع" icon={Layers3} tone="navy" />
          <MetricCard label="متوسط الإنجاز" value={`${averageCompletion}%`} note="متوسط نسبة الإنجاز" icon={TrendingUp} tone="blue" />
          <MetricCard label="التنفيذ النشط" value={activeCount} note="مشروع يحتاج توجيهاً ومتابعة" icon={Target} tone="sky" />
          <MetricCard label="تنبيهات مسجلة" value={challengeCount} note="ملاحظات أو حالات تتطلب إجراءً" icon={AlertTriangle} tone="amber" />
        </section>

        <section className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(330px,0.7fr)]">
          <div className="panel chart-panel">
            <div className="panel-heading">
              <div>
                <div className="panel-eyebrow"><BarChart3 className="h-4 w-4" /> قراءة التقدم</div>
                <h3>المشاريع الأعلى إنجازاً</h3>
              </div>
              <span className="scope-chip">{visibleProjects.length} مشروع</span>
            </div>
            <div className="chart-wrap h-[300px]">
              {topProjects.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topProjects} layout="vertical" margin={{ top: 6, right: 24, bottom: 0, left: 12 }}>
                    <CartesianGrid horizontal={false} stroke="#E7ECF1" />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" width={148} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#53606B" }} />
                    <Tooltip cursor={{ fill: "#F1F6F8" }} formatter={(value: number) => [`${value}%`, "نسبة الإنجاز"]} />
                    <Bar dataKey="completion" radius={[0, 8, 8, 0]} barSize={20}>
                      {topProjects.map((item) => (
                        <Cell key={item.name} fill={statusMeta[item.status].accent} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <EmptyChart />
              )}
            </div>
          </div>

          <div className="panel status-panel">
            <div className="panel-heading">
              <div>
                <div className="panel-eyebrow"><Sparkles className="h-4 w-4" /> قراءة الحالة</div>
                <h3>مسار المشاريع</h3>
              </div>
              <span className="text-xs text-slate-500">اضغط على أي حالة</span>
            </div>
            <div className="mt-5 space-y-3">
              {statusCounts.map((item) => {
                const Icon = item.icon;
                const selected = status === item.status;
                return (
                  <button
                    type="button"
                    key={item.status}
                    onClick={() => setStatus(selected ? "الكل" : item.status)}
                    className={`status-card ${selected ? "is-selected" : ""}`}
                    style={{ "--status-color": item.accent, "--status-soft": item.soft } as CSSProperties}
                    aria-pressed={selected}
                  >
                    <span className="status-icon"><Icon className="h-5 w-5" /></span>
                    <span className="flex-1 text-right">
                      <strong>{item.label}</strong>
                      <small>{item.hint}</small>
                    </span>
                    <span className="status-number">{item.count}</span>
                    <ChevronLeft className="h-4 w-4 opacity-40" />
                  </button>
                );
              })}
            </div>
            <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
              اختيار الحالة يحدّث الرسم وقائمة المشاريع في نفس اللحظة.
            </div>
          </div>
        </section>

        <section className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
          <div className="panel overflow-hidden">
            <div className="panel-heading table-heading">
              <div>
                <div className="panel-eyebrow"><Layers3 className="h-4 w-4" /> التفاصيل التنفيذية</div>
                <h3>المشاريع ضمن الفلاتر الحالية</h3>
              </div>
              <span className="scope-chip">{visibleProjects.length} نتيجة</span>
            </div>
            <div className="project-table-scroll">
              <table className="project-table">
                <thead>
                  <tr>
                    <th>المشروع</th>
                    <th>الفريق</th>
                    <th>الحالة</th>
                    <th>الإنجاز</th>
                    <th aria-label="فتح التفاصيل" />
                  </tr>
                </thead>
                <tbody>
                  {visibleProjects.length ? (
                    visibleProjects
                      .slice()
                      .sort((first, second) => (second.completion ?? -1) - (first.completion ?? -1))
                      .map((project) => (
                        <tr key={project.id} onClick={() => setSelectedProject(project)} tabIndex={0}>
                          <td>
                            <div className="project-name-cell">
                              <span className="project-id">{project.id}</span>
                              <strong>{project.name}</strong>
                            </div>
                          </td>
                          <td><span className="team-name">{project.team}</span></td>
                          <td><StatusPill status={project.status} /></td>
                          <td>
                            <div className="progress-cell">
                              <div className="progress-track"><span style={{ width: `${project.completion ?? 0}%` }} /></div>
                              <span>{project.completion === null ? "—" : `${project.completion}%`}</span>
                            </div>
                          </td>
                          <td><ArrowUpLeft className="h-4 w-4 text-slate-400" /></td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="empty-table">لا توجد مشاريع تطابق الفلاتر الحالية.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel task-panel">
            <div className="panel-heading">
              <div>
                <div className="panel-eyebrow"><CheckCircle2 className="h-4 w-4" /> مهام مرتبطة</div>
                <h3>ملخص التنفيذ</h3>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="task-stat"><span>إجمالي المهام</span><strong>{visibleTasks.length}</strong></div>
              <div className="task-stat"><span>المكتملة</span><strong>{completedTasks}</strong></div>
            </div>
            <div className="mt-5 space-y-3">
              {visibleTasks.slice(0, 4).map((task) => (
                <div key={task.id} className="task-row">
                  <span className="task-check"><CheckCircle2 className="h-4 w-4" /></span>
                  <div>
                    <p>{task.name}</p>
                    <span>{task.projectId} · {task.status}</span>
                  </div>
                </div>
              ))}
              {!visibleTasks.length && <p className="muted-empty">لا توجد مهام ضمن الفلاتر الحالية.</p>}
            </div>
          </div>
        </section>

        {selectedProject && (
          <section className="project-insight" aria-live="polite">
            <div className="insight-mark" style={{ backgroundColor: statusMeta[selectedProject.status].soft, color: statusMeta[selectedProject.status].accent }}>
              <Target className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-500">المشروع المحدد · {selectedProject.id}</p>
              <h4>{selectedProject.name}</h4>
              <p>{selectedProject.notes || selectedProject.challenges || "لا توجد ملاحظات تفصيلية مسجلة لهذا المشروع."}</p>
            </div>
            <button type="button" onClick={() => setSelectedProject(null)} className="close-insight">إغلاق</button>
          </section>
        )}
      </section>
    </main>
  );
}

function MetricCard({
  label,
  value,
  note,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string | number;
  note: string;
  icon: typeof Layers3;
  tone: "navy" | "blue" | "sky" | "amber";
}) {
  return (
    <article className={`metric-card tone-${tone}`}>
      <div className="metric-icon"><Icon className="h-5 w-5" /></div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
        <span>{note}</span>
      </div>
    </article>
  );
}

function StatusPill({ status }: { status: ProjectStatus }) {
  const meta = statusMeta[status];
  return (
    <span className="status-pill" style={{ backgroundColor: meta.soft, color: meta.accent }}>
      {status}
    </span>
  );
}

function EmptyChart() {
  return (
    <div className="grid h-full place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center text-sm text-slate-500">
      <div>
        <BarChart3 className="mx-auto mb-2 h-6 w-6 text-slate-300" />
        لا توجد نسب إنجاز مسجلة ضمن النطاق الحالي.
      </div>
    </div>
  );
}
