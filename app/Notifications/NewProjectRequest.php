<?php

namespace App\Notifications;

use App\Models\ProjectRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewProjectRequest extends Notification
{
    use Queueable;

    public $projectRequest;

    /**
     * Create a new notification instance.
     */
    public function __construct(ProjectRequest $projectRequest)
    {
        $this->projectRequest = $projectRequest;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Project Request from ' . ($this->projectRequest->company_name ?? $this->projectRequest->client_name))
            ->greeting('Hello Admin,')
            ->line('You have received a new project request.')
            ->line('Client: ' . $this->projectRequest->client_name)
            ->line('Email: ' . $this->projectRequest->client_email)
            ->line('Project Type: ' . $this->projectRequest->project_type)
            ->action('View Request', url('/admin/project-requests'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'project_request',
            'request_id' => $this->projectRequest->id,
            'client_name' => $this->projectRequest->client_name,
            'project_type' => $this->projectRequest->project_type,
        ];
    }
}
