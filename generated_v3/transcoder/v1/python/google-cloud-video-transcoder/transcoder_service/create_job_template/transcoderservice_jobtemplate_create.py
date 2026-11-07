# Copyright 2026 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START transcoder_v1_transcoderservice_jobtemplate_create]
import google.api_core.exceptions
from google.cloud.video import transcoder_v1


def create_job_template(
    project_id: str, location_id: str, job_template_id: str
) -> None:
    """Creates a job template for video transcoding.

    Args:
        project_id: The Google Cloud project ID (for example, 'example-project-id').
        location_id: The Google Cloud region where the service is located (for example, 'us-central1').
        job_template_id: ID of the JobTemplate (for example, 'example-jobtemplate-id').
    """
    client = transcoder_v1.TranscoderServiceClient()
    parent = f"projects/{project_id}/locations/{location_id}"

    job_template = transcoder_v1.JobTemplate(
        config=transcoder_v1.JobConfig(
            elementary_streams=[
                transcoder_v1.ElementaryStream(
                    key="video_stream0",
                    video_stream=transcoder_v1.VideoStream(
                        h264=transcoder_v1.VideoStream.H264CodecSettings(
                            height_pixels=720,
                            width_pixels=1280,
                            bitrate_bps=2500000,
                            frame_rate=30,
                        )
                    ),
                ),
                transcoder_v1.ElementaryStream(
                    key="audio_stream0",
                    audio_stream=transcoder_v1.AudioStream(
                        codec="aac",
                        bitrate_bps=64000,
                    ),
                ),
            ],
            mux_streams=[
                transcoder_v1.MuxStream(
                    key="sd",
                    container="mp4",
                    elementary_streams=["video_stream0", "audio_stream0"],
                ),
            ],
        )
    )

    try:
        response = client.create_job_template(
            parent=parent,
            job_template=job_template,
            job_template_id=job_template_id,
        )
        print(f"Job template created: {response.name}")
    except google.api_core.exceptions.GoogleAPICallError as e:
        print(f"Error creating job template: {e.message}")


# [END transcoder_v1_transcoderservice_jobtemplate_create]
