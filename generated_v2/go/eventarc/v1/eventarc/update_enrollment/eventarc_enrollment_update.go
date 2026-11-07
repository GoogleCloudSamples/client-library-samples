// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START eventarc_v1_eventarc_enrollment_update]

import (
	"context"
	"fmt"
	"io"

	eventarc "cloud.google.com/go/eventarc/apiv1"
	eventarcpb "cloud.google.com/go/eventarc/apiv1/eventarcpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the UpdateEnrollment method.
func updateEnrollment(ctx context.Context, w io.Writer, projectID string, locationID string, enrollmentID string) error {
	enrollment := &eventarcpb.Enrollment{
		Name:        fmt.Sprintf("projects/%s/locations/%s/enrollments/%s", projectID, locationID, enrollmentID),
		DisplayName: "Updated Display Name",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := eventarc.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &eventarcpb.UpdateEnrollmentRequest{
		Enrollment: enrollment,
		UpdateMask: updateMask,
	}

	op, err := client.UpdateEnrollment(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateEnrollment failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Updated enrollment: %s\n", resp.GetName())
	return nil
}

// [END eventarc_v1_eventarc_enrollment_update]
