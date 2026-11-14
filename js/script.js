/**
 * Portfolio & Resume Interactive Logic
 * Handles Lucide icons, mobile menu navigation, clipboard copying,
 * simulated terminal ping checks, lab notes inspection, and printable resume modal.
 */

// Initialize Lucide icons on DOM load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Mobile navigation toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a navigation link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// Toast notification helper
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

// Copy text to clipboard using execCommand for broad browser & iframe compatibility
function copyText(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`${label} (${text}) copied to clipboard!`);
}

// Interactive terminal ping simulation
function runPingCheck() {
    const output = document.getElementById('ping-output');
    if (!output) return;

    output.classList.remove('hidden');
    output.innerHTML = 'Pinging 192.168.1.1 with 32 bytes of data...<br>Reply from 192.168.1.1: bytes=32 time=2ms TTL=64 [OK]';
}

// Printable Resume Modal Controllers
function openResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

function triggerResumePrint() {
    showToast('Opening print dialog for PDF export...');
    setTimeout(() => {
        window.print();
    }, 350);
}

// Lab Notes Data Store
const labNotes = {
    topology: {
        title: 'LAB_01 // Cisco Packet Tracer & Wireshark Verification Notes',
        desc: 'Configured basic subnetted IPv4 addressing, DHCP address pools, and DNS resolution in Cisco Packet Tracer, followed by packet header inspection in Wireshark (DHCP DORA sequence, ARP, and ICMP echo replies).',
        code: `! Basic Router Interface & DHCP Pool Setup (Cisco Packet Tracer)
interface GigabitEthernet0/0
 ip address 192.168.10.1 255.255.255.0
 no shutdown
!
ip dhcp excluded-address 192.168.10.1 192.168.10.10
ip dhcp pool LAN_CLIENTS
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 192.168.10.2
!
# Wireshark Display Filters Used for Verification:
# dhcp || dns || icmp
# ip.addr == 192.168.10.1`
    },
    recon: {
        title: 'LAB_02 // Nmap Host Discovery & Vulnerability Identification',
        desc: 'Applied CompTIA Security+ reconnaissance principles using Nmap to enumerate active hosts, detect open ports, identify service banners, and flag unencrypted legacy protocols.',
        code: `# 1. Ping Sweep / Host Discovery on Local Subnet
nmap -sn 192.168.10.0/24

# 2. Service Version Detection & Default Vulnerability Scripts
nmap -sV -sC 192.168.10.15

# 3. Remediation Checklist for Identified Risks:
# [!] Disable Telnet (Port 23) -> Enforce encrypted SSHv2
# [!] Close unused high ports -> Apply host firewall rules`
    },
    webdb: {
        title: 'LAB_03 // Relational Database Schema & Structured SQL Queries',
        desc: 'Designed structured relational tables for tracking records, integrated responsive HTML/CSS/JS forms with C# / ASP.NET backend endpoints, and organized data sets for Excel and Power BI reporting.',
        code: `-- Relational Table Creation & Structured Query Practice
CREATE TABLE tbl_records (
    record_id   INT PRIMARY KEY IDENTITY(1,1),
    client_name VARCHAR(100) NOT NULL,
    category    VARCHAR(50)  NOT NULL,
    status      VARCHAR(20)  DEFAULT 'PENDING',
    created_at  DATETIME     DEFAULT GETDATE()
);

-- Querying & Filtering Verified Entries for Reporting
SELECT category, COUNT(*) AS total_verified
FROM tbl_records
WHERE status = 'VERIFIED'
GROUP BY category
ORDER BY total_verified DESC;`
    }
};

// Open Lab Notes Inspector Modal
function openLabModal(key) {
    const note = labNotes[key];
    if (!note) return;

    document.getElementById('lab-modal-title').textContent = note.title;
    document.getElementById('lab-modal-desc').textContent = note.desc;
    document.getElementById('lab-modal-code').textContent = note.code;

    const modal = document.getElementById('lab-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Close modals when clicking outside the modal card
window.addEventListener('click', (e) => {
    if (e.target.id === 'resume-modal') closeModal('resume-modal');
    if (e.target.id === 'lab-modal') closeModal('lab-modal');
});