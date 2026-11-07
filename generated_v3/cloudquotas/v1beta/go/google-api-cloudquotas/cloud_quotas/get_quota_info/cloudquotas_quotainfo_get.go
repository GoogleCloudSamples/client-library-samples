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

// [START cloudquotas_v1beta_cloudquotas_quotainfo_get]

import (
	"context"
	"fmt"
	"io"

	cloudquotas "cloud.google.com/go/cloudquotas/apiv1beta"
	cloudquotaspb "cloud.google.com/go/cloudquotas/apiv1beta/cloudquotaspb"
)

// getQuotaInfo retrieves information about a specific quota for a project and service.
func getQuotaInfo(ctx context.Context, w io.Writer, projectID string, locationID string, serviceID string, quotaInfoID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/services/%s/quotaInfos/%s", projectID, locationID, serviceID, quotaInfoID)

	client, err := cloudquotas.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &cloudquotaspb.GetQuotaInfoRequest{
		Name: name,
	}

	quotaInfo, err := client.GetQuotaInfo(ctx, req)
	if err != nil {
		return fmt.Errorf("GetQuotaInfo: %w", err)
	}

	fmt.Fprintf(w, "Quota info name: %s\n", quotaInfo.GetName())
	fmt.Fprintf(w, "Quota metric: %s\n", quotaInfo.GetMetric())
	fmt.Fprintf(w, "Quota is fixed: %t\n", quotaInfo.GetIsFixed())

	return nil
}

// [END cloudquotas_v1beta_cloudquotas_quotainfo_get]
