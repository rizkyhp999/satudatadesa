import { SurveyForm } from "@/components/survey-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Survei Keluarga Indonesia
          </h1>
          <p className="text-slate-600 text-lg">
            Formulir Pendataan Keluarga dan Anggota Keluarga
          </p>
        </div>
        <SurveyForm />
      </div>
    </div>
  );
}
