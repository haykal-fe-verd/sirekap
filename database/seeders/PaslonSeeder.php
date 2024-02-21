<?php

namespace Database\Seeders;

use App\Models\Calon;
use App\Models\Partai;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaslonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dataPartai = [
            [
                'nama' => 'Partai Kebangkitan Bangsa (PKB)',
                'calon' => [
                    [
                        'nama' => "Irmawan, Sos. MM"
                    ],
                    [
                        'nama' => "Muhammad Ramadhana Rusli Bintang, M.M"
                    ],
                    [
                        'nama' => "Mahdalena, S.Hut"
                    ],
                    [
                        'nama' => "Teuku Hamzah Husen, S.E., M.M"
                    ],
                    [
                        'nama' => "Mujlisal, S.Ag"
                    ],
                    [
                        'nama' => "drh Hasnidar"
                    ],
                    [
                        'nama' => "Tgk. H. Syarifuddin, M.A"
                    ],


                ]
            ],
            [
                'nama' => 'Partai Gerakan Indonesia Raya (Gerindra)',
                'calon' => [
                    ['nama' => "Fadhlullah"],
                    ['nama' => "Dra. Hj. ZULHAFAH"],
                    ['nama' => "Drs. HASANUDDIN DARJO, M.M."],
                    ['nama' => "Ir. H. MAULISMAN HANAFIAH"],
                    ['nama' => "Ir. MUDDATSTSIR KAMIL"],
                    ['nama' => "ERLIN, S.E."],
                    ['nama' => "ZAITUN MHD"],
                ]
            ],
            [
                'nama' => 'Partai Demokrasi Indonesia Perjuangan (PDI-P)',
                'calon' => [
                    ['nama' => "Sofyan Dawood"],
                    ['nama' => "Jamaluddin Idham, S.H., M.H"],
                    ['nama' => "YUNIATI"],
                    ['nama' => "RIFKI TAJUDDIN, S.E."],
                    ['nama' => "H. Ramli, MS"],
                    ['nama' => "PUSPITA FIRDA OKTYANI"],
                    ['nama' => "H. Dahlan Jamaluddin, S.I.P"],
                ]
            ],
            [
                'nama' => 'Partai Golongan Karya (GOLKAR)',
                'calon' => [
                    ['nama' => "Teuku Muhammad Nurlif, S.E"],
                    ['nama' => "H. M. SALIM FAKHRY, S.E., M.M."],
                    ['nama' => "HJ. SAMSIAR, S.E."],
                    ['nama' => "Drs. H. T. Zulkarnaini Ampon Bang"],
                    ['nama' => "Dr. H. M. SALEH.P, S.Pd.I., M.Si."],
                    ['nama' => "NENI RUMIANTI DAULAY, S.E."],
                    ['nama' => "T. M. ALI TAR"],
                ]
            ],
            [
                'nama' => 'Partai NasDem',
                'calon' => [
                    ['nama' => "Dr. Teuku Taufiqulhadi, M.Si"],
                    ['nama' => "H. Muslim Ayub, S.H., M.M"],
                    ['nama' => "Hj. Dra. Mediati Hafni Hanum, S.H., M.Kn., CPM."],
                    ['nama' => "TEUNGKU RAZUAN, S.H."],
                    ['nama' => "T. Iskandar Daod, S.E., M.Si."],
                    ['nama' => "Cut Sri Mainita"],
                    ['nama' => "Suprijal Yusuf, S.H."],
                ]
            ],
            [
                'nama' => 'Partai Buruh',
                'calon' => [
                    ['nama' => "Habibi Inseun"],
                    ['nama' => "Mahadi Manik, S.Si., M.Si."],
                    ['nama' => "Rosmana Dewi"],
                    ['nama' => "Sayed Masykur, S.T."],
                    ['nama' => "Zarlina"],
                    ['nama' => "Hariyanto Latuheru"],
                    ['nama' => "Siti Sundari"],
                ]
            ],
            [
                'nama' => 'Partai Gelombang',
                'calon' => [
                    ['nama' => "AZMI FAJRI USMAN"],
                    ['nama' => "TGK KHALIDI AL-DJADAMI"],
                    ['nama' => "KASUMIYATI"],
                    ['nama' => "NASRUDDIN AWL"],
                    ['nama' => "EDY SUPENO"],
                    ['nama' => "FANIA VIVI HIKMAWATI, S.E"],
                    ['nama' => "MOHARRIADI"],
                ]
            ],
            [
                'nama' => 'Partai Keadilan Sejahtera (PKS)',
                'calon' => [
                    ['nama' => "Gufran"],
                    ['nama' => "Rafli Kande"],
                    ['nama' => "FRIESKA INDAH SARI, S.E."],
                    ['nama' => "BUHARI SELIAN"],
                    ['nama' => "SAID MUSTAJAB, S.Sos."],
                    ['nama' => "Ns. SINTA NELYSA, S.Kep."],
                    ['nama' => "Sriwahyuni"],
                ]
            ],
            [
                'nama' => 'Partai Kebangkitan Nusantara (PKN)',
                'calon' => [
                    ['nama' => "YUDI KURNIA"],
                    ['nama' => "Amrinur Oktjaya"],
                    ['nama' => "Hj Seri peraini"],
                    ['nama' => "Yanti octavia"],
                    ['nama' => "NELY INDRAWATI"],
                    ['nama' => "NOLA NOLIA"],
                ]
            ],
            [
                'nama' => 'Partai Hati Nurani (HANURA)',
                'calon' => [
                    ['nama' => "Prof. Dr. BACHTIAR ALY, M.A."],
                    ['nama' => "Dr. H. ASFIFUDDIN, S.H., M.H."],
                    ['nama' => "FITRIAH ISPANDI"],
                    ['nama' => "AL AMIN, S.H."],
                    ['nama' => "INTAN KHAIRANI"],
                    ['nama' => "SRI ARIANA NINGSIH"],
                    ['nama' => "ADNAN YACOB, S.E."],
                ]
            ],
            [
                'nama' => 'Partai Garda Republik Indonseia (GARDA)',
                'calon' => [
                    ['nama' => "CHAIDIR FURRAZI NUR"],
                    ['nama' => "PUTRI CHOIRUN NISYA"],
                    ['nama' => "EGI KURNIA PUTRA"],
                    ['nama' => "BENING LARASATI"],
                    ['nama' => "T Iskandar S.T"],
                    ['nama' => "SETYANI LARASATI"],
                ]
            ],
            [
                'nama' => 'Partai Amanat Nasional (PAN)',
                'calon' => [
                    ['nama' => "H. Nazaruddin Dek Gam"],
                    ['nama' => "MOHD. ALFATAH, S.Ag."],
                    ['nama' => "Ir. Hj. FERRY SORAYA, M.S.I.E"],
                    ['nama' => "Dewi marlina"],
                    ['nama' => "Muhclis zulkifli"],
                    ['nama' => "Gita Isna Yunita"],
                    ['nama' => "ZULFITRI ARIFIN"],
                ]
            ],
            [
                'nama' => 'Partai Bulan Bintang (PBB)',
                'calon' => [
                    ['nama' => "H. ERLI HASIM, S.H., S.Ag., M.I.Kom."],
                    ['nama' => "Dr. TGK. H. MUHAMMAD YUS"],
                    ['nama' => "NURATIAH HANIM, A.Md.Kep."],
                    ['nama' => "Salawati Dahlan M S, S.E."],
                    ['nama' => "HAMZAH, S.Sos.I."],
                    ['nama' => "Heri Ramunandar, S.H."],
                    ['nama' => "SALAMUN, S.E."],
                ]
            ],
            [
                'nama' => 'Partai Demokrat',
                'calon' => [
                    ['nama' => "H. TEUKU RIEFKY HARSYA, B.Sc., M.T."],
                    ['nama' => "H. T. IBRAHIM, S.T., M.M."],
                    ['nama' => "NURHAYATI"],
                    ['nama' => "Khairullah"],
                    ['nama' => "Tgk. HARMEN NURIQMAR, S.S."],
                    ['nama' => "RIZQA ZANIA"],
                    ['nama' => "Teuku Rassya Isslamay Pasya"],
                ]
            ],
            [
                'nama' => 'Partai Solidaritas Indonesia (PSI)',
                'calon' => [
                    ['nama' => "Qausar Harta Yudana"],
                    ['nama' => "AL-QUDRI, S.T.P."],
                    ['nama' => "Ercut Nova Sari"],
                    ['nama' => "ARIEF MARTHA RAHADYAN"],
                    ['nama' => "Ismaidi"],
                    ['nama' => "Suci Nur Maizaroh"],
                    ['nama' => "Slamet Satyawati"],
                ]
            ],
            [
                'nama' => 'Partai Perindo',
                'calon' => [
                    ['nama' => "Mayjen. TNI (Purn.) ABDUL HAFIL FUDDIN, S.H., S.I.P., M.H."],
                    ['nama' => "AZWAR RAMLI"],
                    ['nama' => "Intan Monika"],
                    ['nama' => "DENY ZULFIKAR"],
                    ['nama' => "Abdon Siagian"],
                    ['nama' => "Siwi asri mopri ratna"],
                    ['nama' => "DWI AGUS SETIYORINI"],
                ]
            ],
            [
                'nama' => 'Partai Persatuan Pembangunan (PPP)',
                'calon' => [
                    ['nama' => "AMRI M ALI"],
                    ['nama' => "Illiza Sa'aduddin Djamal, S.E"],
                    ['nama' => "HILMAN ISMAIL METAREUM, S.E."],
                    ['nama' => "H. ANSARI IDRUS SAMBO, S.H."],
                    ['nama' => "HARMANIAR"],
                    ['nama' => "SAID SAIFUL AL MAHDALI"],
                    ['nama' => "Cut rana wati"],

                ]
            ],
            [
                'nama' => 'Partai Ummat',
                'calon' => [
                    ['nama' => "H. JAMAI SUNI, S.E., M.M."],
                    ['nama' => "H. ANAS BIDIN NYAK SYECH, S.Ag."],
                    ['nama' => "Cut Evita"],
                    ['nama' => "Drs. USTAZ ARSYAD AHJON"],
                    ['nama' => "Drs. SAIFUDDIN SAMIN"],
                    ['nama' => "FARIDAH, S.E."],
                    ['nama' => "EFFRIDANDA M., S.E."],

                ]
            ],
        ];

        $no = 1;
        foreach ($dataPartai as $partaiData) {
            $partai = Partai::create([
                'nama' => $partaiData['nama'],
                'nomor' => $no++
            ]);

            $nomorUrut = 1;
            foreach ($partaiData['calon'] as $calonData) {
                $calon = new Calon([
                    'nomor' => $nomorUrut++,
                    'nama' => $calonData['nama']
                ]);

                $partai->calon()->save($calon);
            }
        }
    }
}
